import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"QuestObjectiveTypes",
	new Schema({
		id: Number,
		nameId: String
	})
);
