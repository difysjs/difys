import fs from "fs";
import path from "path";
import packageJSON from "../../package.json";
import binaryList from "../Services/binaries/binaries.json";

const pluginPackageFileName = "plugin.json";
const pluginRootPath = "./src/Plugins/";
const pluginPaths = getDirectoryList(pluginRootPath);

function getDirectoryList(dirPath) {
	return fs
		.readdirSync(dirPath, {
			withFileTypes: true
		})
		.filter(entry => entry.isDirectory())
		.map(dir => path.resolve(dirPath + path.sep + dir.name));
}

function getPluginActions(pluginPath) {
	if (fs.existsSync(pluginPath + "/actions")) {
		const pluginName = pluginPath.split(path.sep).slice(-1)[0];
		const pluginConfigPath = pluginPath + "\\" + "config.json";
		const pluginConfig = require(pluginConfigPath);

		if (!pluginConfig.disabled) {
			const actionsSets = getDirectoryList(pluginPath + "/actions");
			let actions = [];

			for (let actionsSet of actionsSets) {
				const actionSliceType = actionsSet.split(path.sep).slice(-1)[0];
				const actionFiles = fs.readdirSync(actionsSet);

				for (const actionFileName of actionFiles) {
					actions.push({
						slice: actionSliceType,
						pluginName,
						path: actionsSet + path.sep + actionFileName
					});
				}
			}
			return actions;
		}
	}
	return [];
}

function getPluginsDependencies() {
	let dependencies = [];

	for (const pluginPath of pluginPaths) {
		const pluginPackagePath = pluginPath + "\\" + pluginPackageFileName;
		const pluginConfigPath = pluginPath + "\\" + "config.json";

		if (fs.existsSync(pluginPackagePath)) {
			const pluginPackage = require(pluginPackagePath);
			const pluginConfig = require(pluginConfigPath);

			if (
				pluginConfig.disabled == false &&
				pluginPackage.dependencies instanceof Array
			) {
				for (const dependency of pluginPackage.dependencies) {
					if (/^[a-z0-9-@/]+$/i.test(dependency)) {
						dependencies.push(dependency);
					}
				}
			}
		}
	}
	if (packageJSON.dependencies && dependencies.length) {
		for (const key in packageJSON.dependencies) {
			const index = dependencies.indexOf(key);

			if (index > -1) {
				dependencies.splice(index, 1);
			}
		}
	}
	return dependencies;
}

function getPluginsBinaries() {
	let binaries = [];

	for (const pluginPath of pluginPaths) {
		const pluginPackagePath = pluginPath + "\\" + pluginPackageFileName;
		const pluginConfigPath = pluginPath + "\\" + "config.json";

		if (fs.existsSync(pluginPackagePath)) {
			const pluginPackage = require(pluginPackagePath);
			const pluginConfig = require(pluginConfigPath);

			if (
				pluginConfig.disabled == false &&
				pluginPackage.binaries instanceof Array
			) {
				for (const binary of pluginPackage.binaries) {
					if (binaryList.available.includes(binary)) {
						binaries.push(binary);
					}
				}
			}
		}
	}
	return binaries;
}

export {
	pluginPaths,
	getPluginActions,
	getPluginsDependencies,
	getPluginsBinaries
};
