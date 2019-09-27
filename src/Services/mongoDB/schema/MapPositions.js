import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"MapPositions",
	new Schema({
		_type: String,
		id: Number,
		posX: Number,
		posY: Number,
		outdoor: Boolean,
		capabilities: Number,
		sounds: [
			{
				_type: String,
				id: Number,
				volume: Number,
				criterionId: Number,
				silenceMin: Number,
				silenceMax: Number,
				channel: Number,
				type_id: Number
			}
		],
		subAreaId: Number,
		worldMap: Number,
		hasPriorityOnWorldmap: Boolean
	})
);
