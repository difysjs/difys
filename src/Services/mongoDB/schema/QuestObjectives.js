import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"QuestObjectives",
	new Schema({
		_type: String,
		stepId: Number,
		typeId: Number,
		mapId: Number,
		id: Number,
		dialogId: Number,
		parameters: [Number],
		coords: {
			_type: String,
			x: Number,
			y: Number
		}
	})
);
