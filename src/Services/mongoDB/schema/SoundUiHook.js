import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SoundUiHook",
	new Schema({
		id: Number,
		name: String
	})
);
