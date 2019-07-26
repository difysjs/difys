import store from "./Modules/Store";
import { metadata } from "./Modules/Store/reducers/slices";
import {
	getAppVersion,
	getBuildVersion,
	getAssetsVersion,
	logger
} from "./Libs";
import ModuleLoader from "./Loaders/ModuleLoader";
import PluginLoader from "./Loaders/PluginLoader";

const { setMetadata } = metadata.actions;

(async () => {
	const core = new ModuleLoader();
	const plugins = new PluginLoader();

	core.listeners.plugins = plugins.listeners;
	/* const unsubscribe = store.subscribe(() => {
		console.log(store.getState());
	}); */
	try {
		const [assets, appVersion, buildVersion] = await Promise.all([
			getAssetsVersion(),
			getAppVersion(),
			getBuildVersion()
		]);
		const metadata = {
			appVersion,
			buildVersion,
			assetsVersion: assets.assetsVersion,
			staticDataVersion: assets.staticDataVersion
		};
		store.dispatch(setMetadata(metadata));
	} catch (error) {
		logger.error(error);
	}
	await core.mount();
	plugins.mount(core.connections);
	// unsubscribe();
})();
