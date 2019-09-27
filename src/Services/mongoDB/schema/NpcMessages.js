import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"NpcMessages",
	new Schema({
		id: Number,
		messageId: String
	})
);
