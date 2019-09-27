import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"ServerPopulations",
	new Schema({
		id: Number,
		nameId: String,
		weight: Number
	})
);
