import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Notifications",
	new Schema({
		id: Number,
		titleId: String,
		messageId: String,
		iconId: Number,
		typeId: Number,
		trigger: String
	})
);
