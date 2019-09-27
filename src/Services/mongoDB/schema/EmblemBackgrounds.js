import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"EmblemBackgrounds",
	new Schema({
		id: Number,
		order: Number
	})
);
