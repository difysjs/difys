import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Breeds",
	new Schema({
		id: Number,
		shortNameId: String,
		longNameId: String,
		descriptionId: String,
		gameplayDescriptionId: String,
		maleLook: String,
		femaleLook: String,
		creatureBonesId: Number,
		maleArtwork: Number,
		femaleArtwork: Number,
		statsPointsForStrength: Array,
		statsPointsForIntelligence: Array,
		statsPointsForChance: Array,
		statsPointsForAgility: Array,
		statsPointsForVitality: Array,
		statsPointsForWisdom: Array,
		breedSpellsId: [Number],
		maleColors: [Number],
		femaleColors: [Number]
	})
);
