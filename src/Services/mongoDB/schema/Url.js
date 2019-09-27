import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Url",
	new Schema({
		id: Number,
		browserId: Number,
		url: String,
		param: String,
		method: String
	})
);
