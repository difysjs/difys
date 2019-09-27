import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"QuestSteps",
	new Schema({
		id: Number,
		questId: Number,
		nameId: String,
		descriptionId: String,
		dialogId: Number,
		optimalLevel: Number,
		duration: Number,
		kamasScaleWithPlayerLevel: Boolean,
		kamasRatio: Number,
		xpRatio: Number,
		objectiveIds: [Number],
		rewardsIds: []
	})
);
