import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"ActionDescriptions",
	new Schema({
		id: Number,
		typeId: Number,
		name: String,
		trusted: Boolean,
		needInteraction: Boolean,
		maxUsePerFrame: Number,
		minimalUseInterval: Number,
		needConfirmation: Boolean
	})
);
