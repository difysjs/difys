import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Documents",
	new Schema({
		id: Number,
		typeId: Number,
		titleId: String,
		authorId: String,
		subTitleId: String,
		contentId: String,
		contentCSS: String
	})
);
