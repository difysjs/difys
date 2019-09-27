import PluginLoader from "../Loaders/pluginLoader";
import ScriptLoader from "../Loaders/scriptLoader";

const username = "";
const pluginLoader = new PluginLoader();
const scriptLoader = new ScriptLoader();
scriptLoader.mount();
scriptLoader.runScript(username, "test", pluginLoader);
