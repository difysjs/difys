import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"NpcActions",
	new Schema({
		id: Number,
		nameId: String
	})
);
