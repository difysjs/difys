import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Appearances",
	new Schema({
		id: Number,
		type: Number,
		data: String
	})
);
