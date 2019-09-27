import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"ModelName",
	new Schema({
		id: Number,
		nameId: String,
		look: String
	})
);
