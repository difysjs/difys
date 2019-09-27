import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Ornaments",
	new Schema({
		id: Number,
		nameId: String,
		visible: Boolean,
		assetId: Number,
		iconId: Number,
		rarity: Number,
		order: Number
	})
);
