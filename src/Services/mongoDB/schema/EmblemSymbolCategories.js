import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"EmblemSymbolCategories",
	new Schema({
		id: Number,
		nameId: String
	})
);
