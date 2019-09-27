import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Heads",
	new Schema({
		id: Number,
		skins: String,
		assetId: String,
		breed: Number,
		gender: Number,
		label: String,
		order: Number
	})
);
