import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"TypeActions",
	new Schema({
		id: Number,
		elementName: String,
		elementId: Number
	})
);
