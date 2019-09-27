import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Effects",
	new Schema({
		id: Number,
		descriptionId: String,
		iconId: Number,
		characteristic: Number,
		category: Number,
		operator: String,
		showInTooltip: Boolean,
		useDice: Boolean,
		forceMinMax: Boolean,
		boost: Boolean,
		active: Boolean,
		showInSet: Boolean,
		bonusType: Number,
		useInFight: Boolean,
		effectPriority: Number
	})
);
