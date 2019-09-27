import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AlignmentRank",
	new Schema({
		id: Number,
		orderId: Number,
		nameId: String,
		descriptionId: String,
		minimumAlignment: Number,
		objectsStolen: Number,
		gifts: [Number]
	})
);
