import fs from "fs";
import path from "path";

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
		let pluginName = pluginPath.split(path.sep).slice(-1)[0];
		let actionsSets = getDirectoryList(pluginPath + "/actions");
		let actions = [];

		for (let actionsSet of actionsSets) {
			let actionSliceType = actionsSet.split(path.sep).slice(-1)[0];
			let actionFiles = fs.readdirSync(actionsSet);

			for (let actionFileName of actionFiles) {
				actions.push({
					slice: actionSliceType,
					pluginName,
					path: actionsSet + path.sep + actionFileName
				});
			}
		}
		return actions;
	}
	return [];
}

export { pluginPaths, getPluginActions };
