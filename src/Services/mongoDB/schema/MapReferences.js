import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"MapReferences",
	new Schema({
		id: Number,
		mapId: Number,
		cellId: Number
	})
);
