const boilerplate = {
	metadata: {
		appVersion: String,
		buildVersion: String
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
				token: String
			},
			primus: {
				salt: String,
				key: Array
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
					general: {
						type: "general",
						experience: 807124,
						experienceLevelFloor: 768050,
						experienceNextLevelFloor: 861650,
						kamas: 70917,
						statsPoints: 0,
						additionnalPoints: 0,
						spellsPoints: 1,
						lifePoints: 205,
						maxLifePoints: 205,
						energyPoints: 9790,
						maxEnergyPoints: 10000,
						actionPointsCurrent: 7,
						movementPointsCurrent: 3,
						spellModifications: [],
						probationTime: 0
					},
					alignmentInfos: {
						type: "alignmentInfos",
						alignmentSide: 0,
						alignmentValue: 0,
						alignmentGrade: 0,
						characterPower: 3088005,
						honor: 0,
						honorGradeFloor: 0,
						honorNextGradeFloor: 500,
						aggressable: 0
					},
					initiative: {
						type: "initiative",
						base: 440,
						additionnal: 0,
						objectsAndMountBonus: 0,
						alignGiftBonus: 0,
						contextModif: 0
					}
				}
			}
		}
	}
};

export default boilerplate;
