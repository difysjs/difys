import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Months",
	new Schema({
		id: Number,
		nameId: String
	})
);
