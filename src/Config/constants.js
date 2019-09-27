const constants = {
	baseUrl: "https://proxyconnection.touch.dofus.com",
	haapiUrl: "https://haapi.ankama.com/json/Ankama/v2",
	entries: {
		haapi: "/Api/CreateApiKey",
		token: "/Account/CreateToken",
		build: "/build/script.js",
		config: "/config.json",
		assets: "/assetsVersions.json"
	},
	app: {
		url: "https://itunes.apple.com/lookup",
		params: country => {
			return new URLSearchParams({
				country,
				id: 1041406978,
				lang: "en",
				limit: 1
			});
		}
	}
};

export default constants;
