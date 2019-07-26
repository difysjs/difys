import fs from "fs";

export default class PluginLoader {
	constructor() {
		this.plugins = {};
		this.listeners = [];

		const pluginNames = fs.readdirSync("./src/Plugins/");

		for (let pluginName of pluginNames) {
			const Plugin = require(`../Plugins/${pluginName}/index.js`).default;
			this.plugins[pluginName] = new Plugin();
			this.listeners = this.listeners.concat(
				this.plugins[pluginName].listeners
			);
		}
	}

	mount(connections) {
		for (let pluginName in this.plugins) {
			this.plugins[pluginName].mount(connections);
		}
	}
}
