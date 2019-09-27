import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"TaxCollectorNames",
	new Schema({
		id: Number,
		nameId: String
	})
);
