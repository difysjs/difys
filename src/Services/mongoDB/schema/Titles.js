import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Titles",
	new Schema({
		id: Number,
		nameMaleId: String,
		nameFemaleId: String,
		visible: Boolean,
		categoryId: Number
	})
);
