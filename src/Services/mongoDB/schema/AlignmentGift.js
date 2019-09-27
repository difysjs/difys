import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AlignmentGift",
	new Schema({
		id: Number,
		nameId: String,
		effectId: Number,
		gfxId: Number
	})
);
