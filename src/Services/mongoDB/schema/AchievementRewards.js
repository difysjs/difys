import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AchievementRewards",
	new Schema({
		id: Number,
		achievementId: Number,
		levelMin: Number,
		levelMax: Number,
		itemsReward: [Number],
		itemsQuantityReward: [Number],
		emotesReward: [],
		spellsReward: [],
		titlesReward: [],
		ornamentsReward: []
	})
);
