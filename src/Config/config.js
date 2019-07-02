import accountList from "./accountlist.json";
import path from "path";

const clientConfig = {
	lang: "fr",
	country: "fr",
	gatherData: true,
	accounts: accountList
};

const modulesConfig = {};

const pluginsConfig = {};

const constants = {
	configURL: "https://proxyconnection.touch.dofus.com/config.json",
	buildVersionUrl: "https://proxyconnection.touch.dofus.com/build/script.js",
	appVersionRequestConfig: {
		url: "https://itunes.apple.com/lookup",
		params: {
			country: clientConfig.country,
			id: 1041406978,
			lang: clientConfig.lang,
			limit: 1,
			t: Date.now()
		}
	}
};

const logsConfig = {
	path: path.resolve("./logs"),
	debugMode: true
};

export { logsConfig, clientConfig, modulesConfig, pluginsConfig, constants };
