import fs from "fs";
import { logger } from "../Libs";

export default class PluginLoader {
	constructor() {
		this.plugins = {};
		this.listeners = [];
		this.availablePlugins = fs
			.readdirSync("./src/Plugins/", {
				withFileTypes: true
			})
			.filter(file => file.isDirectory())
			.map(file => file.name);
	}

	async mount(connections) {
		logger.info("CORE | Hooking up plugins");

		for (let pluginName of this.availablePlugins) {
			const Plugin = require(`../Plugins/${pluginName}/index.js`).default;
			const plugin = new Plugin();
			const requiredPlugins = plugin.package.requiredPlugins.filter(
				name => !this.availablePlugins.includes(name)
			);
			if (requiredPlugins.length) {
				logger.warn(
					`[${pluginName} Plugin] Required plugins: ${requiredPlugins.join(
						", "
					)}`
				);
			}
			if (
				(plugin.config && plugin.config.disabled) ||
				requiredPlugins.length ||
				(await plugin.mount(connections)) === false
			) {
				logger.warn(`[${pluginName} Plugin] is disabled`);
			} else {
				this.plugins[pluginName] = plugin;
				plugin.connections = connections;
				// We can improve that logic by implementating array with scope in the event emitter
				for (let listener of plugin.listeners) {
					this.listeners.push([listener, plugin]);
				}
			}
		}
		Object.defineProperty(global, "Plugin", {
			value: this.plugins,
			enumerable: true
		});
	}
}
