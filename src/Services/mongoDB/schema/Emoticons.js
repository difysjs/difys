import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Emoticons",
	new Schema({
		id: Number,
		nameId: String,
		shortcutId: String,
		order: Number,
		defaultAnim: String,
		persistancy: Boolean,
		eight_directions: Boolean,
		aura: Boolean,
		anims: [String],
		cooldown: Number,
		duration: Number,
		weight: Number
	})
);
