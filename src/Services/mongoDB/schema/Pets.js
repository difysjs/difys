import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Pets",
	new Schema({
		id: Number,
		foodItems: [Number],
		foodTypes: [Number]
	})
);
