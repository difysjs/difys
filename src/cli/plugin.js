import fs from "fs";
import path from "path";
import logger from "../Libs/Logger";
import basePlugins from "./basePlugins.json";
import request from "request";
import https from "https";
import Zip from "adm-zip";
import chmodr from "chmodr";

request.defaults({
	agentClass: https.Agent,
	agentOptions: {
		keepAlive: true,
		maxSockets: 1
	},
	encoding: null,
	headers: {
		Accept:
			"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
		"Accept-Encoding": "gzip, deflate, br",
		"Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
		"User-Agent":
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36",
		Connection: "keep-alive"
	}
});

const urlRegex = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
const filenameFromHeaderRegex = /(filename=|filename\*='')(.*)$/;
const githubSearchRegex = /(?:difys-)(.*)(?:-plugin)/gi;

function downloadPlugin(filename, url) {
	return new Promise((resolve, reject) => {
		const downloadDirectory = "./src/Plugins";
		const filePath = path.resolve(downloadDirectory, filename + ".zip");
		const file = fs.createWriteStream(filePath);
		const req = request.get(url);
		let unzipName;

		req.on("response", response => {
			if (response.statusCode !== 200) {
				const errorMessage = "Request error " + response.statusCode;
				return reject(errorMessage);
			}
			const fileSize = Math.floor(
				response.headers["content-length"] / 1000
			); // KB
			const contentDisposition = response.headers["content-disposition"];
			unzipName = contentDisposition.match(filenameFromHeaderRegex)[2];
			logger.info(`(${fileSize} KB) Downloading plugin ${filename}...`);
			req.pipe(file);
		});
		req.on("error", error => {
			fs.unlinkSync(filePath);
			reject(error.message);
		});
		file.on("finish", () => {
			const unzipPath = path
				.resolve(downloadDirectory, unzipName)
				.slice(0, -4);

			logger.info("Done downloading plugin" + filename);
			file.close();
			const zip = new Zip(filePath);
			zip.extractAllToAsync(downloadDirectory, false);
			chmodr(unzipPath, 0o777, error => {
				if (!error) {
					fs.unlinkSync(filePath);
					fs.renameSync(
						unzipPath,
						path.resolve(downloadDirectory, filename)
					);
					resolve();
				}
			});
		});
		file.on("error", error => {
			fs.unlinkSync(filePath);
			reject(error.message);
		});
	});
}

function getPluginFromGithubUserRepository(url) {
	return new Promise((resolve, reject) => {
		request.get(url, (error, response, body) => {
			if (error) {
				return reject(error);
			}
			resolve(body.match(githubSearchRegex));
		});
	});
}

function getPluginListFromGithubUserRepository() {
	return new Promise(resolve => {
		const pluginList = {};
		const basePluginsUsers = Object.keys(basePlugins);
		let repository = getPluginFromGithubUserRepository(
			basePlugins[basePluginsUsers[0]]
		);
		for (let i = 1; i < basePluginsUsers.length + 1; i++) {
			const username = basePluginsUsers[i];

			repository = repository.then(nameList => {
				if (username) {
					const url = basePlugins[username];
					pluginList[username] = [
						...new Set(
							nameList.map(
								pluginName =>
									githubSearchRegex.exec(pluginName)[1]
							)
						)
					];
					return getPluginFromGithubUserRepository(url);
				}
			});
		}
		repository.then(() => resolve(pluginList));
	});
}

async function add(args) {
	const pluginName = args[0];
	let pluginUrl = pluginName;
	const isUrl = urlRegex.test(pluginName);

	if (!isUrl) {
		const pluginList = await getPluginListFromGithubUserRepository();
		let isBasePlugin = false;

		for (const username in pluginList) {
			const pluginIndex = pluginList[username].indexOf(
				pluginName.toLowerCase()
			);
			if (pluginIndex > -1) {
				pluginUrl = `https://codeload.github.com/${username}/difys-${pluginList[username][pluginIndex]}-plugin/zip/master`;
				isBasePlugin = true;
				break;
			}
		}
		if (!isBasePlugin) {
			logger.error(
				new Error(`Plugin ${pluginName} is not a base plugin`)
			);
			return false;
		}
	}
	if (fs.existsSync(path.join("./src/Plugins/", pluginName))) {
		logger.error(new Error(`Plugin ${pluginName} already exist`));
		return false;
	}
	await downloadPlugin(pluginName, pluginUrl);
}

async function remove(args) {
	return new Promise((resolve, reject) => {
		const pluginPath = path.resolve("./src/Plugins/", args[0]);

		chmodr(pluginPath, 0o777, error => {
			if (error) {
				if (error.code == "ENOENT") {
					logger.error(new Error("Folder not found"));
				} else {
					reject(error);
				}
			} else {
				fs.unlink(pluginPath, error => {
					if (error) {
						if (error.code == "EPERM") {
							logger.error(
								new Error(
									"Cannot remove the plugin folder, you'll need to do it manually"
								)
							);
						} else {
							reject(error);
						}
					} else {
						resolve();
					}
				});
			}
		});
	});
}

function toggleDisabling(args, disabled) {
	const configPath = path.resolve("./src/Plugins/", args[0], "config.json");
	if (fs.existsSync(configPath)) {
		const config = require(configPath);

		if (
			typeof config.disabled !== "undefined" &&
			config.disabled != disabled
		) {
			config.disabled = disabled;
			fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
		} else {
			logger.info(
				`${args[0]} plugin already ${
					["enabled", "disabled"][Number(disabled)]
				}`
			);
		}
	} else {
		logger.error(new Error(`${args[0]} plugin doesn't have a config file`));
	}
}

function disable(args) {
	toggleDisabling(args, true);
}

function enable(args) {
	toggleDisabling(args, false);
}

function list() {
	const plugins = fs
		.readdirSync("./src/Plugins", {
			withFileTypes: true
		})
		.filter(file => file.isDirectory())
		.map(file => file.name);

	console.log(plugins.join(", "));
}

async function update(args) {
	const pluginPath = path.resolve("./src/Plugins/", args[0], "plugin.json");
	const plugin = require(pluginPath).default;
	const currentVersion = getCurrentVersion(plugin.source);

	if (plugin.version != currentVersion) {
		await remove(args);
		await add(args);
	}
}

function getCurrentVersion(url) {
	return new Promise((resolve, reject) => {
		request.get({ url, json: true }, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				resolve(body.version);
			} else {
				reject(error);
			}
		});
	});
}

function help() {
	console.log(
		`\n\nUsage: difys plugin <action> <plugin name>\n\nActions:\n    add, remove, disable, update, list\n\n`
	);
}

export default { add, remove, enable, disable, list, update, help };
