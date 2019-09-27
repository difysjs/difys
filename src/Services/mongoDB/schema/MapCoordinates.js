import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"MapCoordinates",
	new Schema({
		compressedCoords: Number,
		mapIds: [Number]
	})
);
