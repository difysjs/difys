import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AlignmentOrder",
	new Schema({
		id: Number,
		nameId: String,
		sideId: Number
	})
);
