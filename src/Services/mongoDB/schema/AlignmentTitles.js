import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AlignmentTitles",
	new Schema({
		sideId: Number,
		namesId: [String],
		shortsId: [String]
	})
);
