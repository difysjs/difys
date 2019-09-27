import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"ServerCommunities",
	new Schema({
		id: Number,
		nameId: String,
		defaultCountries: [String],
		shortId: String
	})
);
