import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"InfoMessages",
	new Schema({
		typeId: Number,
		messageId: Number,
		textId: String
	})
);
