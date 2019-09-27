import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"PresetIcons",
	new Schema({
		id: Number,
		order: Number
	})
);
