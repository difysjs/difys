import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Servers",
	new Schema({
		id: Number,
		nameId: String,
		commentId: String,
		openingDate: Number,
		language: String,
		populationId: Number,
		gameTypeId: Number,
		communityId: Number,
		restrictedToLanguages: []
	})
);
