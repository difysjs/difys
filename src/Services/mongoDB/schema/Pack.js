import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Pack",
	new Schema({
		id: Number,
		name: String,
		hasSubAreas: Number
	})
);
