// import MyFirstPlugin from '../Plugins/Myfirstplugin';

export default class PluginLoader {
	constructor() {
		this.plugins = {
			// MyfirstPlugin: new MyFirstPlugin()
		};
	}

	mount(connections) {
		for (let plugin in this.plugins) {
			this.plugins[plugin].mount(connections);
		}
	}
}
