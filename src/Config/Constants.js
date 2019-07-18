const constants = {
	baseUrl: "https://proxyconnection.touch.dofus.com",
	haapiUrl: "https://haapi.ankama.com/json/Ankama/v2",
	entries: {
		haapi: "/Api/CreateApiKey",
		token: "/Account/CreateToken",
		build: "/build/script.js",
		config: "/config.json"
	},
	app: {
		url: "https://itunes.apple.com/lookup",
		params: (country, lang) => {
			return new URLSearchParams({
				country,
				id: 1041406978,
				lang,
				limit: 1,
				t: Date.now()
			});
		}
	},
	userAgent:
		"Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1"
};

export default constants;
