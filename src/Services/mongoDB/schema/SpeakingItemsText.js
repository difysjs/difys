import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SpeakingItemsText",
	new Schema({
		textId: Number,
		textProba: Number,
		textStringId: String,
		textLevel: Number,
		textSound: Number,
		textRestriction: String
	})
);
