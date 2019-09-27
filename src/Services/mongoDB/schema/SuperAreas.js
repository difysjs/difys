import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SuperAreas",
	new Schema({
		id: Number,
		nameId: String,
		worldmapId: Number
	})
);
