import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"ChatChannels",
	new Schema({
		id: Number,
		nameId: String,
		descriptionId: String,
		shortcut: String,
		shortcutKey: String,
		isPrivate: Boolean,
		allowObjects: Boolean
	})
);
