import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Smileys",
	new Schema({
		id: Number,
		order: Number,
		gfxId: String,
		forPlayers: Boolean,
		triggers: [String]
	})
);
