/* Libs */
/* Modules */
/* Configuration */
/* Entry */

export default class Core {
	constructor() {
		this.Modules = new ModuleLoader();
	}

	mount() {
		this.Modules.mount();
	}
	unmount() {
		this.Modules.unmount();
	}
}
