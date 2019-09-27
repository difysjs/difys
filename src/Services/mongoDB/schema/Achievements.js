import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Achievements",
	new Schema({
		id: Number,
		nameId: String,
		categoryId: Number,
		descriptionId: String,
		iconId: Number,
		points: Number,
		level: Number,
		order: Number,
		kamasRatio: Number,
		experienceRatio: Number,
		kamasScaleWithPlayerLevel: Boolean,
		objectiveIds: [Number],
		rewardIds: [Number]
	})
);
