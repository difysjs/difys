import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"IncarnationLevels",
	new Schema({
		id: Number,
		incarnationId: Number,
		level: Number,
		requiredXp: Number
	})
);
