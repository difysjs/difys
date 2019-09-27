import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Dungeons",
	new Schema({
		id: Number,
		nameId: String,
		optimalPlayerLevel: Number,
		mapIds: [Number],
		entranceMapId: Number,
		exitMapId: Number
	})
);
