import store from "./Modules/Store";
import { metadata } from "./Modules/Store/reducers/slices";
import { getAppVersion, getBuildVersion } from "./Libs";
import ModuleLoader from "./Loaders/ModuleLoader";

const { setAppVersion, setBuildVersion } = metadata.actions;

(async () => {
	const core = new ModuleLoader();
	// const plugins = new pluginLoader;
	store.dispatch(setAppVersion(await getAppVersion()));
	store.dispatch(setBuildVersion(await getBuildVersion()));
	core.mount();
})();
