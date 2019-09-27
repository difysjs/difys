import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AchievementCategories",
	new Schema({
		id: Number,
		nameId: String,
		parentId: Number,
		icon: String,
		order: Number,
		color: String,
		achievementIds: [Number]
	})
);
