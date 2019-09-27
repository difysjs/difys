import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SoundUi",
	new Schema({
		_type: String,
		id: Number,
		uiName: String,
		openFile: String,
		closeFile: String,
		subElements: []
	})
);
