import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Recipes",
	new Schema({
		resultId: Number,
		resultLevel: Number,
		ingredientIds: [Number],
		quantities: [Number]
	})
);
