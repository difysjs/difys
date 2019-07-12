import Store from "../Modules/Store";
import Auth from "../Modules/Auth";
// import Network from "../Modules/Network";
// import PluginManager from "../Modules/PluginManager";

export default class ModuleLoader {
	constructor() {
		this.modules = [new Store(), new Auth()];
		// References all modules instances by their name into that class for easy access
		for (let instance of this.modules) {
			this[instance.constructor.name] = instance;
		}
	}

	mount() {
		for (let instance of this.modules) {
			instance.mount();
		}
	}

	unmount() {
		for (let instance of this.modules) {
			instance.unmount();
		}
	}
}
