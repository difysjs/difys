import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SpellStates",
	new Schema({
		id: Number,
		nameId: String,
		preventsSpellCast: Boolean,
		preventsFight: Boolean,
		critical: Boolean
	})
);
