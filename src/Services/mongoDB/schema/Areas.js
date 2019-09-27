import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Areas",
	new Schema({
		_type: String,
		id: Number,
		nameId: String,
		superAreaId: Number,
		containHouses: Boolean,
		containPaddocks: Boolean,
		bounds: {
			_type: String,
			x: Number,
			y: Number,
			width: Number,
			height: Number
		}
	})
);
