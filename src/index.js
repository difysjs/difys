import store from "./Modules/Store";
import slices from "./Modules/Store/reducers/slices";
import {
	getAppVersion,
	getBuildVersion,
	getAssetsVersion,
	logger,
	yarn,
	getPluginsDependencies
} from "./Libs";
import ModuleLoader from "./Loaders/moduleLoader";
import PluginLoader from "./Loaders/pluginLoader";
import ScriptLoader from "./Loaders/scriptLoader";
import runServices from "./Services";
import { general } from "./Config";

const { setMetadata } = slices.metadata.actions;

(async () => {
	logger.info("CORE | Initiating services");
	await runServices();
	logger.info("CORE | Initiating difys");
	logger.info("CORE | Checking for plugins dependencies");
	const dependencies = getPluginsDependencies();

	if (await yarn.add(dependencies)) {
		logger.info(
			dependencies.length +
				" plugin dependencies installed, please restart."
		);
		process.exit();
	}
	logger.info("CORE | No plugins dependencies need to be installed");
	const moduleLoader = new ModuleLoader();
	const pluginLoader = new PluginLoader();
	const scriptLoader = new ScriptLoader();

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
			assetsFullVersion: assets.assetsFullVersion,
			staticDataVersion: assets.staticDataVersion
		};
		store.dispatch(setMetadata(metadata));
	} catch (error) {
		logger.error(error);
	}
	logger.info("CORE | Loading accounts");

	try {
		await moduleLoader.mount();
		await scriptLoader.mount();
	} catch (error) {
		logger.error(new Error(error));
	}
	moduleLoader.listeners.plugins = pluginLoader.listeners;
	await pluginLoader.mount(moduleLoader.connections);
	logger.info("CORE | Plugins hooked successfuly");

	for (let username in moduleLoader.connections) {
		moduleLoader.connections[username].load(moduleLoader.listeners);
	}
	if (general.statusUpdates.enabled) {
		setInterval(() => {
			const accounts = store.getState().accounts;
			for (const account in moduleLoader.connections)
				logger.info(
					`| ${account} | \u001b[32m${accounts[account].status}`
				);
		}, general.statusUpdates.interval * 60000);
	}
})();
