import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"CensoredContents",
	new Schema({
		lang: String,
		type: Number,
		oldValue: Number,
		newValue: Number
	})
);
