import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"HintCategory",
	new Schema({
		id: Number,
		nameId: String
	})
);
