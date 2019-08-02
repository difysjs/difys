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
import { general } from "./Config";
import { initServer } from "./Services";

const { setMetadata } = metadata.actions;

(async () => {
	if (general.hasOwnProperty("server")) {
		const port = general.server.port;
		const password = general.server.password;
		initServer(port, password);
	}

	logger.info("CORE | Initiating difys");

	const core = new ModuleLoader();
	const plugins = new PluginLoader();

	core.listeners.plugins = plugins.listeners;
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
	logger.info("CORE | Loading accounts");
	try {
		await core.mount();
	} catch (error) {
		logger.error(new Error(error));
	}
	logger.info("CORE | Hooking up plugins");
	plugins.mount(core.connections);
	logger.info("CORE | Plugins hooked successfuly");
	if (general.statusUpdates.enabled) {
		setInterval(() => {
			const accounts = store.getState().accounts;
			for (const account in core.connections)
				logger.info(
					`| ${account} | \u001b[32m${accounts[account].status}`
				);
		}, general.statusUpdates.interval * 60000);
	}
})();
