import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"EmblemSymbols",
	new Schema({
		id: Number,
		skinId: Number,
		iconId: Number,
		order: Number,
		categoryId: Number,
		colorizable: Boolean
	})
);
