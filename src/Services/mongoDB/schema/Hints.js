import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Hints",
	new Schema({
		id: Number,
		categoryId: Number,
		gfx: Number,
		nameId: String,
		mapId: Number,
		realMapId: Number,
		x: Number,
		y: Number,
		outdoor: Boolean,
		subareaId: Number,
		worldMapId: Number
	})
);
