export const State = {
	metadata: {
		appVersion: String,
		buildVersion: String
	},
	accounts: {
		someUsername: {
			accountId: Number,
			username: "someUsername",
			status: "CONNECTING", // HARVEST|FIGHTING|RUNNING|SWITCHING_SERVER|SWITCHING_TO_GAME
			auth: {
				haapi: "",
				token: ""
			},
			gameData: {
				map: {
					coordinates: [2, 1],
					entities: {
						"165432": {
							id: "165432",
							name: "in-game-username",
							level: 200
						}
					}
				},
				inventory: {
					items: {
						"100": {
							id: "100",
							quantity: "20"
						},
						"240": {
							id: "240",
							quantity: "10"
						}
					},
					equipped: [34, 2523, 435]
				},
				stats: {
					health: Number,
					energy: Number,
					level: Number,
					xp: Number,
					angel_or_demon: Number
					// ...theStatThingie
				}
			}
		}
	}
};
