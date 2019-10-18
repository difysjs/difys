import { pluginPaths } from "../../../Libs";
import path from "path";

export function getAll(req, res) {
	const params = req.query;
	let config = false;
	let includePackage = false;
	let disabled = 0;

	for (const param of Object.keys(params)) {
		switch (param) {
			case "config":
				config = params.config === "true";
				break;
			case "disabled":
				disabled = params.disabled === "true" ? 2 : 1;
				break;
			case "package":
				includePackage = params.package === "true";
				break;
		}
	}
	const configs = {};
	const pluginNames = pluginPaths
		.map(pluginPath => {
			const pluginName = pluginPath.split(path.sep).pop();
			const pluginConfig = require(path.join(pluginPath, "config.json"));
			configs[pluginName] = pluginConfig;
			return (disabled == 2) === pluginConfig.disabled || disabled == 0
				? pluginName
				: false;
		})
		.filter(p => p);

	if (config || includePackage) {
		const data = {};

		for (const pluginName of pluginNames) {
			data[pluginName] = config ? { config: configs[pluginName] } : {};

			if (includePackage) {
				const pluginPackage = require(path.join(
					pluginPaths.find(p => p.includes(pluginName)),
					"plugin.json"
				));
				data[pluginName].package = pluginPackage;
			}
		}
		res.send(data);
	} else {
		res.send(pluginNames);
	}
}
