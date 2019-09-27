import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Challenge",
	new Schema({
		id: Number,
		nameId: String,
		descriptionId: String,
		points: Number
	})
);
