import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AlmanaxCalendars",
	new Schema({
		id: Number,
		nameId: String,
		descId: String,
		npcId: Number
	})
);
