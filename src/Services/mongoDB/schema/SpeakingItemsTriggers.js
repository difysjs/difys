import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SpeakingItemsTriggers",
	new Schema({
		triggersId: Number,
		textIds: [Number],
		states: [Number]
	})
);
