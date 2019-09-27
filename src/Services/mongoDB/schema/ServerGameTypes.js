import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"ServerGameTypes",
	new Schema({
		id: Number,
		nameId: String
	})
);
