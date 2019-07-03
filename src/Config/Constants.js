export default {
	Auth: {
		CreateApiKey:
			"https://haapi.ankama.com/json/Ankama/v2/Api/CreateApiKey",
		CreateToken:
			"https://haapi.ankama.com/json/Ankama/v2/Account/CreateToken?game=18"
	},
	Versions: {
		Configuration: "https://proxyconnection.touch.dofus.com/config.json",
		Build: "https://proxyconnection.touch.dofus.com/build/script.js",
		App:
			"https://itunes.apple.com/lookup?country=fr&id=1041406978&lang=fr&limit=1&t=" +
			Date.now(),
		Assets: "https://proxyconnection.touch.dofus.com/assetsVersions.json"
	},
	Servers: {
		Auth: "https://proxyconnection.touch.dofus.com",
		Game: "https://oshimogameproxy.touch.dofus.com"
	}
};
