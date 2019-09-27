import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"TitleCategories",
	new Schema({
		id: Number,
		nameId: String
	})
);
