const constants = {
	configuration: "https://proxyconnection.touch.dofus.com/config.json",
	build: "https://proxyconnection.touch.dofus.com/build/script.js",
	app: {
		url: "https://itunes.apple.com/lookup",
		params: (country, lang) => {
			return {
				country,
				id: 1041406978,
				lang,
				limit: 1,
				t: Date.now()
			};
		}
	}
};

export default constants;
