import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Interactives",
	new Schema({
		id: Number,
		nameId: String,
		actionId: Number,
		displayTooltip: Boolean
	})
);
