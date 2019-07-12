export const State = {
	metadata: {
		appVersion: String,
		buildVersion: String
	},
	accounts: {
		someUsername: {
			accountId: Number,
			username: "someUsername",
			auth: {
				haapi: "",
				token: ""
			},
			map: {
				coordinates: [2, 1],
				entities: [
					{
						// Player entity example
						name: "in-game-username",
						level: Number,
						contextualId: Number
					}
				]
			},
			inventory: {
				items: [122, 54, 65],
				equipped: [34, 2523, 435]
			},
			stats: {
				health: Number,
				energy: Number,
				level: Number,
				xp: Number,
				angel_or_demon: Number
				// ...theStatThingie
			},
			status: "CONNECTING" // HARVEST|FIGHTING|RUNNING|SWITCHING_SERVER|SWITCHING_TO_GAME
		}
	}
};
