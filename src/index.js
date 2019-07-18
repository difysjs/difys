import store from "./Modules/Store";
import { metadata } from "./Modules/Store/reducers/slices";
import { getAppVersion, getBuildVersion } from "./Libs";
import ModuleLoader from "./Loaders/ModuleLoader";

const { setAppVersion, setBuildVersion } = metadata.actions;

(async () => {
	const core = new ModuleLoader();
	// const plugins = new pluginLoader;
	const unsubscribe = store.subscribe(() => {
		console.log(store.getState());
	});
	const metadata = {
		appVersion: getAppVersion(),
		buildVersion: getBuildVersion()
	};
	store.dispatch(setAppVersion(await metadata.appVersion));
	store.dispatch(setBuildVersion(await metadata.buildVersion));
	await core.mount();
	unsubscribe();
})();
