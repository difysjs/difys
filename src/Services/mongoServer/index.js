import childProcess from "child_process";
import readline from "readline";
import fs from "fs";
import path from "path";
import request from "request";
import targz from "targz";
import Zip from "adm-zip";
import chmodr from "chmodr";

const platform = process.platform;
const OSDownloadListBaseUrl = "https://fastdl.mongodb.org/";
const mongoDBVersions = [
	"Windows x64 x64",
	"macOS x64",
	"Ubuntu 16.04 Linux 64-bit x64",
	"Ubuntu 18.04 Linux 64-bit x64",
	"Ubuntu 18.04 Linux 64-bit ARM 64",
	"Debian 9 Linux 64-bit x64",
	"RHEL 6.2 Linux 64-bit x64",
	"RHEL 6.7 Linux 64-bit IBM Z Series",
	"RHEL 7.0 Linux 64-bit x64",
	"RHEL 7.2 Linux 64-bit IBM Z Series",
	"SUSE 12 Linux 64-bit x64",
	"SUSE 12 Linux 64-bit IBM Z Series",
	"Amazon Linux 64-bit x64",
	"Amazon Linux 2 64-bit x64"
];
const OSDownloadList = [
	"win32/mongodb-win32-x86_64-2012plus-4.2.0.zip",
	"osx/mongodb-macos-x86_64-4.2.0.tgz",
	"linux/mongodb-linux-x86_64-ubuntu1604-4.2.0.tgz",
	"linux/mongodb-linux-x86_64-ubuntu1804-4.2.0.tgz",
	"linux/mongodb-linux-aarch64-ubuntu1804-4.2.0.tgz",
	"linux/mongodb-linux-x86_64-debian92-4.2.0.tgz",
	"linux/mongodb-linux-x86_64-rhel62-4.2.0.tgz",
	"linux/mongodb-linux-s390x-rhel67-4.2.0.tgz",
	"linux/mongodb-linux-x86_64-rhel70-4.2.0.tgz",
	"linux/mongodb-linux-s390x-rhel72-4.2.0.tgz",
	"linux/mongodb-linux-x86_64-suse12-4.2.0.tgz",
	"linux/mongodb-linux-s390x-suse12-4.2.0.tgz",
	"linux/mongodb-linux-x86_64-amazon-4.2.0.tgz",
	"linux/mongodb-linux-x86_64-amazon2-4.2.0.tgz"
];

function supportPlatform() {
	return new Promise(resolve => {
		fs.access(`${__dirname}/bin/${platform}`, error =>
			error ? resolve(false) : resolve(true)
		);
	});
}

function chooseOSType() {
	return new Promise(async (resolve, reject) => {
		switch (platform) {
			case "aix":
				console.log(
					"We are very sorry, your current OS is not supported by MongoDB"
				);
				process.exit();
				break;
			case "win32":
				await downloadMongoDB(OSDownloadList[0]);
				resolve();
				break;
			case "darwin":
				await downloadMongoDB(OSDownloadList[1]);
				resolve();
				break;
			default:
				var rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout
				});
				rl.question(
					`Please choose the MongoDB OS version you need:\n${mongoDBVersions
						.map((version, index) => `${index + 1}. ${version}`)
						.join("\n")}\n`,
					async answer => {
						if (answer % 1 == 0 && answer >= 1 && answer <= 14) {
							try {
								await downloadMongoDB(
									OSDownloadList[answer - 1]
								);
								resolve();
							} catch (error) {
								reject(error);
							}
						} else {
							console.log(answer + " is not a valid asnwer");
							chooseOSType();
						}
						rl.close();
					}
				);
		}
	});
}

function setupMongoDirectory(decompressPath) {
	return new Promise((resolve, reject) => {
		const mongoBinDirectory = path.join(decompressPath, "bin");
		const dbPath = path.join(__dirname, "data");

		if (!fs.existsSync(dbPath)) {
			fs.mkdirSync(dbPath);
		}
		fs.readdir(mongoBinDirectory, (error, mongoBinFiles) => {
			if (error) {
				return reject(error);
			}
			let i = 0;
			for (let file of mongoBinFiles) {
				fs.rename(
					path.join(mongoBinDirectory, file),
					path.join(path.dirname(decompressPath), file),
					error => {
						i++;
						if (error) {
							return reject(error);
						}
						if (i == mongoBinFiles.length) {
							resolve();
						}
					}
				);
			}
		});
	});
}

function decompressMongoDBFile(filePath) {
	return new Promise((resolve, reject) => {
		const extension = path.extname(filePath);
		const unzipPath = path.dirname(filePath);
		console.log("Extracting MongoDB files...");

		switch (extension) {
			case ".tgz":
				targz.decompress(
					{
						src: filePath,
						dest: unzipPath
					},
					error =>
						error
							? reject(error)
							: resolve(filePath.replace(extension, ""))
				);
				break;
			case ".zip":
				const zip = new Zip(filePath);
				zip.extractAllToAsync(unzipPath, false);
				chmodr(filePath, 0o777, error => {
					if (error) {
						reject(error);
					} else {
						resolve(filePath.replace(extension, ""));
					}
				});
				break;
		}
	});
}

function downloadMongoDB(pathname) {
	const pathnameDirectory = pathname.split("/");
	const dirname = path.join(__dirname, "bin", platform);
	const filename = pathnameDirectory[1];
	const filePath = path.join(dirname, filename);

	return new Promise((resolve, reject) => {
		if (!fs.existsSync(dirname)) {
			fs.mkdirSync(dirname);
		}
		const file = fs.createWriteStream(filePath);
		const req = request.get(OSDownloadListBaseUrl + pathname);

		req.on("response", response => {
			if (response.statusCode !== 200) {
				const errorMessage = "Request error " + response.statusCode;
				return reject(errorMessage);
			}
			const fileSize = Math.floor(
				response.headers["content-length"] / 1000000
			); // MB
			console.log(
				`(${fileSize} MB) Downloading file in Services/mongoServer/${filename} ...`
			);
			req.pipe(file);
		});
		req.on("error", error => {
			fs.unlink(filePath, () => {});
			return reject(error.message);
		});
		file.on("finish", async () => {
			console.log("Done downloading Services/mongoServer/" + filename);
			file.close();
			const decompressPath = await decompressMongoDBFile(filePath);
			await setupMongoDirectory(decompressPath);
			fs.unlink(filePath, () => {});
			fs.unlink(decompressPath, () => {});
			resolve();
		});
		file.on("error", error => {
			fs.unlink(filePath, () => {});
			return reject(error.message);
		});
	});
}

export default function run() {
	return new Promise(async (resolve, reject) => {
		if ((await supportPlatform(platform)) === false) {
			// Proceed to download MongoDB
			try {
				await chooseOSType();
				console.log("MongoDB successfully installed");
			} catch (error) {
				return reject(error);
			}
		}
		console.log(
			`\x1b[44m Service \x1b[0m MongoDB - \x1b[35mInitialising...\x1b[0m`
		);
		let serverStartFileName = fs
			.readdirSync(path.join(__dirname, `/bin/${platform}/`))
			.find(name => name.includes("mongod") && !name.includes("mdmp"));

		let server = childProcess.spawn(
			`${__dirname}/bin/${platform}/${serverStartFileName}`,
			["--dbpath", path.join(__dirname, "/data")]
		);
		server.stdout.on("data", data => {
			if (
				data.includes("NETWORK") &&
				data.includes("waiting for connections on port")
			) {
				resolve();
			}
		});
		server.stderr.on("data", data => reject(new Error(data)));
		server.on("close", code => {
			reject(new Error(`child process exited with code ${code}`));
		});
		server.on("exit", code => {
			reject(new Error(`child process exited with code ${code}`));
		});
	});
}
