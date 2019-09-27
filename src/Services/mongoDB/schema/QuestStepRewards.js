import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"QuestStepRewards",
	new Schema({
		id: Number,
		stepId: Number,
		levelMin: Number,
		levelMax: Number,
		itemsReward: [],
		emotesReward: [],
		jobsReward: [],
		spellsReward: []
	})
);
