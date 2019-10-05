import store from "./Modules/Store";
import slices from "./Modules/Store/reducers/slices";
import {
	getAppVersion,
	getBuildVersion,
	getAssetsVersion,
	logger,
	updatePluginsDependencies
} from "./Libs";
import ModuleLoader from "./Loaders/moduleLoader";
import PluginLoader from "./Loaders/pluginLoader";
import ScriptLoader from "./Loaders/scriptLoader";
import runServices from "./Services";

(async () => {
	try {
		await runServices();
		logger.info("CORE | Initiating difys");
		logger.info("CORE | Checking for plugins dependencies");
		await updatePluginsDependencies();
		logger.info("CORE | No plugins dependencies need to be installed");

		const moduleLoader = new ModuleLoader();
		const pluginLoader = new PluginLoader();
		const scriptLoader = new ScriptLoader();

		const [assets, appVersion, buildVersion] = await Promise.all([
			getAssetsVersion(),
			getAppVersion(),
			getBuildVersion()
		]);
		store.dispatch(
			slices.metadata.actions.setMetadata({
				appVersion,
				buildVersion,
				assetsVersion: assets.assetsVersion,
				assetsFullVersion: assets.assetsFullVersion,
				staticDataVersion: assets.staticDataVersion
			})
		);
		await pluginLoader.mount();
		await moduleLoader.mount(pluginLoader);
		await scriptLoader.mount();
		moduleLoader.connectAccounts();
	} catch (error) {
		logger.error(error);
	}
})();
