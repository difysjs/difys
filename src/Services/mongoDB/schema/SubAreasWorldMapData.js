import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SubAreasWorldMapData",
	new Schema({
		id: Number,
		nameId: String,
		areaId: Number,
		level: Number,
		gridPositions: {}
	})
);
