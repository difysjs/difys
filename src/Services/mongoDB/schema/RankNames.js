import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"RankNames",
	new Schema({
		id: Number,
		nameId: String,
		order: Number
	})
);
