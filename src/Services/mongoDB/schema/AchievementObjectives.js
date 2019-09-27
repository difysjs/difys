import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AchievementObjectives",
	new Schema({
		id: Number,
		achievementId: Number,
		nameId: String,
		criterion: String
	})
);
