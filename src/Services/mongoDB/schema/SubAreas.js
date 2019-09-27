import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SubAreas",
	new Schema({
		_type: String,
		id: Number,
		nameId: String,
		areaId: Number,
		ambientSounds: [
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
		mapIds: [Number],
		bounds: {
			_type: String,
			x: Number,
			y: Number,
			width: Number,
			height: Number
		},
		shape: [Number],
		customWorldMap: [],
		packId: Number,
		level: Number,
		isConquestVillage: Boolean,
		displayOnWorldMap: Boolean,
		monsters: [Number],
		entranceMapIds: [],
		exitMapIds: [],
		capturable: Boolean
	})
);
