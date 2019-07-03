/* Libs */
/* Modules */
/* Configuration */
/* Entry */

export default class ModuleLoader {
	constructor() {
		this.Auth = new Auth();
		this.Network = new Network();
		this.Store = new Store();
		this.PluginManager = new PluginManager();
	}

	mount() {
		this.Auth.mount();
		this.Network.mount();
		this.Store.mount();
		this.PluginManager.mount();
	}

	unmount() {
		this.Auth.unmount();
		this.Network.unmount();
		this.Store.unmount();
		this.PluginManager.unmount();
	}
}
