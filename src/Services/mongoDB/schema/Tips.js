import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Tips",
	new Schema({
		id: Number,
		descId: String
	})
);
