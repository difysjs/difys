import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"TaxCollectorFirstnames",
	new Schema({
		id: Number,
		firstnameId: String
	})
);
