import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"ItemTypes",
	new Schema({
		id: Number,
		nameId: String,
		superTypeId: Number,
		plural: Boolean,
		gender: Number,
		rawZone: String,
		needUseConfirm: Boolean
	})
);
