import fs from "fs";

export default class PluginLoader {
	constructor() {
		this.plugins = {};
		this.listeners = [];

		const pluginNames = fs
			.readdirSync("./src/Plugins/", { withFileTypes: true })
			.filter(file => file.isDirectory())
			.map(fileInfo => fileInfo.name);

		for (let pluginName of pluginNames) {
			const Plugin = require(`../Plugins/${pluginName}/index.js`).default;
			this.plugins[pluginName] = new Plugin();

			// We can improve that logic by implementating array with scope in the event emitter
			for (let listener of this.plugins[pluginName].listeners) {
				this.listeners.push([listener, this.plugins[pluginName]]);
			}
		}
	}

	mount(connections) {
		for (let pluginName in this.plugins) {
			this.plugins[pluginName].mount(connections);
		}
	}
}
