import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Jobs",
	new Schema({
		id: Number,
		nameId: String,
		specializationOfId: Number,
		iconId: Number,
		toolIds: []
	})
);
