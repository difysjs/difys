import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"QuestCategory",
	new Schema({
		id: Number,
		nameId: String,
		order: Number,
		questIds: [Number]
	})
);
