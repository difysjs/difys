import fs from "fs";
import { logger } from "../Libs";

export default class PluginLoader {
	constructor() {
		this.plugins = {};
		this.listeners = [];

		const pluginNames = fs
			.readdirSync("./src/Plugins/", {
				withFileTypes: true
			})
			.filter(file => file.isDirectory())
			.map(file => file.name);

		for (const pluginName of pluginNames) {
			const Plugin = require(`../Plugins/${pluginName}/index.js`).default;
			const plugin = new Plugin();
			this.plugins[pluginName] = plugin;
		}
	}

	async mount(connections) {
		logger.info("CORE | Hooking up plugins");

		for (let pluginName in this.plugins) {
			const plugin = this.plugins[pluginName];
			const requiredPlugins = plugin.package.requiredPlugins.filter(
				name => !this.plugins.hasOwnProperty(name)
			);
			if (
				(plugin.config && plugin.config.disabled) ||
				requiredPlugins.length ||
				(await plugin.mount(connections)) === false
			) {
				if (requiredPlugins.length == 0) {
					logger.warn(`[${pluginName} Plugin] is disabled`);
				} else {
					logger.warn(
						`[${pluginName} Plugin] Required plugins: ${requiredPlugins.join(
							", "
						)}`
					);
				}
				delete this.plugins[pluginName];
			} else {
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
