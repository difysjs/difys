import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"LivingObjectSkinJntMood",
	new Schema({
		skinId: Number,
		moods: []
	})
);
