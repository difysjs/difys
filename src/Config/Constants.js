export default {
	Auth: {
		CreateApiKey: "/Api/CreateApiKey",
		CreateToken: "/Account/CreateToken"
	},
	Versions: {
		Configuration: "https://proxyconnection.touch.dofus.com/config.json",
		Build: "https://proxyconnection.touch.dofus.com/build/script.js",
		App: [
			"https://itunes.apple.com/lookup",
			{
				params: {
					country: "fr",
					id: 1041406978,
					lang: "fr",
					limit: 1,
					t: Date.now()
				}
			}
		]
	}
};
