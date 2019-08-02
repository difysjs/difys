const boilerplate = {
	metadata: {
		appVersion: String,
		buildVersion: String,
		assetsVersion: String,
		staticDataVersion: String
	},
	accounts: {
		someUsername: {
			username: "someUsername",
			status: "CONNECTING", // HARVEST|FIGHTING|RUNNING|SWITCHING_SERVER|SWITCHING_TO_GAME
			auth: {
				apiKey: String,
				apiID: Number,
				accountID: Number,
				sessionID: String,
				token: String,
				serversById: {
					"406": {
						name: "Terra Cogita",
						id: 406,
						status: 4,
						completion: 0,
						charactersCount: 3,
						gameTypeId: 2,
						date: 312497074
					}
					// a lot of servers
				},
				serversByName: {
					"Terra Cogita": {
						name: "Terra Cogita",
						id: 406,
						status: 4,
						completion: 0,
						charactersCount: 3,
						gameTypeId: 2,
						date: 312497074
					}
				},
				selectedServer: "Terra Cogita",
				selectedServerData: {
					address: "6.9.6.9",
					port: "1337",
					id: 406,
					ticket: "someTicket",
					access: "server socket url"
				}
			},
			extra: {
				nickname: "someNickname",
				subscribtionEndDate: "",
				selectedCharacter: {
					characterName: "my-character",
					level: 69,
					id: 120000
				},
				currentSequenceNumber: 3
			},
			plugins: {
				myPlugin: {
					name: "myPlugin"
					// custom plugin store
				}
			}
		}
	}
};

export default boilerplate;
