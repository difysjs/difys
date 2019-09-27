import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AlignmentEffect",
	new Schema({
		id: Number,
		characteristicId: Number,
		descriptionId: String
	})
);
