import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Houses",
	new Schema({
		typeId: Number,
		defaultPrice: Number,
		nameId: String,
		gfxId: Number
	})
);
