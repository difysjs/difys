import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"BidHouseCategories",
	new Schema({
		id: Number,
		allowedTypes: [Number],
		description: String
	})
);
