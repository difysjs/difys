import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SpellTypes",
	new Schema({
		id: Number,
		longNameId: String,
		shortNameId: String
	})
);
