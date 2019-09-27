import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AlignmentBalance",
	new Schema({
		id: Number,
		startValue: Number,
		endValue: Number,
		nameId: String,
		descriptionId: String
	})
);
