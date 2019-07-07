export default class PluginLoader {
	constructor() {
		this.plugins = [];
		// References all plugins instances by their name into that class for easy access
		for (let instance of this.plugins) {
			this[instance.constructor.name] = instance;
		}
	}

	mount() {
		for (let instance of this.plugins) {
			instance.mount();
		}
	}

	unmount() {
		for (let instance of this.plugins) {
			instance.unmount();
		}
	}
}
