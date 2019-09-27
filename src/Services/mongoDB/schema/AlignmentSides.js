import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AlignmentSides",
	new Schema({
		id: Number,
		nameId: String,
		canConquest: Boolean
	})
);
