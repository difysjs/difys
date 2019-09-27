import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SoundBones",
	new Schema({
		_type: String,
		id: Number,
		keys: [String],
		values: []
	})
);
