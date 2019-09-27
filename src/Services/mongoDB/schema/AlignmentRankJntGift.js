import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AlignmentRankJntGift",
	new Schema({
		id: Number,
		gifts: [Number],
		parameters: [Number],
		levels: [Number]
	})
);
