import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SpellBombs",
	new Schema({
		id: Number,
		chainReactionSpellId: Number,
		explodSpellId: Number,
		wallId: Number,
		instantSpellId: Number,
		comboCoeff: Number
	})
);
