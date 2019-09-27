import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Spells",
	new Schema({
		id: Number,
		nameId: String,
		descriptionId: String,
		typeId: Number,
		scriptParams: String,
		scriptParamsCritical: String,
		scriptId: Number,
		scriptIdCritical: Number,
		iconId: Number,
		spellLevels: [Number]
	})
);
