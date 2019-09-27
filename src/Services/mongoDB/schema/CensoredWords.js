import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"CensoredWords",
	new Schema({
		id: Number,
		listId: Number,
		language: String,
		word: String,
		deepLooking: Boolean
	})
);
