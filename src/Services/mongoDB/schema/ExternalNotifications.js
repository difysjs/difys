import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"ExternalNotifications",
	new Schema({
		id: Number,
		categoryId: Number,
		iconId: Number,
		colorId: Number,
		descriptionId: String,
		defaultEnable: Boolean,
		defaultSound: Boolean,
		defaultMultiAccount: Boolean,
		defaultNotify: Boolean,
		name: String,
		messageId: String
	})
);
