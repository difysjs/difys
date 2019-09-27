import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Incarnation",
	new Schema({
		id: Number,
		lookMale: String,
		lookFemale: String
	})
);
