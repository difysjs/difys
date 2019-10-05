import fs from "fs";
import { logger } from "../Libs";

export default class PluginLoader {
	constructor() {
		this.plugins = {};
		this.listeners = [];
	}

	async mount() {
		logger.info("CORE | Hooking up plugins");
		const availablePlugins = await this.getAvailablePlugins();

		for (const pluginName of availablePlugins) {
			const Plugin = require(`../Plugins/${pluginName}/index.js`).default;
			const plugin = new Plugin();
			const requiredPlugins = plugin.package.requiredPlugins
				.filter(name => !availablePlugins.includes(name))
				.join(", ");

			if (requiredPlugins.length) {
				logger.warn(
					`[${pluginName} Plugin] Required plugins: ${requiredPlugins}`
				);
			}
			if (
				(plugin.config && plugin.config.disabled) ||
				requiredPlugins.length ||
				(typeof plugin.mount == "function" &&
					(await plugin.mount()) === false)
			) {
				logger.warn(`[${pluginName} Plugin] is disabled`);
			} else {
				this.plugins[pluginName] = plugin;
				plugin.connections = {};
				// We can improve that logic by implementating array with scope in the event emitter
				for (const listener of plugin.listeners) {
					this.listeners.push([listener, plugin]);
				}
			}
		}
		Object.defineProperty(global, "Plugin", {
			value: this.plugins,
			enumerable: true
		});
		logger.info("CORE | Plugins hooked successfuly");
	}

	async getAvailablePlugins() {
		return new Promise((resolve, reject) => {
			fs.readdir(
				"./src/Plugins/",
				{
					withFileTypes: true
				},
				(error, files) =>
					error
						? reject(error)
						: resolve(
								files
									.filter(file => file.isDirectory())
									.map(file => file.name)
						  )
			);
		});
	}
}
