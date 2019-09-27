import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Items",
	new Schema({
		_type: String,
		id: Number,
		nameId: String,
		typeId: Number,
		descriptionId: String,
		iconId: Number,
		level: Number,
		realWeight: Number,
		cursed: Boolean,
		useAnimationId: Number,
		usable: Boolean,
		targetable: Boolean,
		exchangeable: Boolean,
		price: Number,
		twoHanded: Boolean,
		etheral: Boolean,
		itemSetId: Number,
		criteria: String,
		criteriaTarget: String,
		hideEffects: Boolean,
		enhanceable: Boolean,
		nonUsableOnAnother: Boolean,
		appearanceId: Number,
		secretRecipe: Boolean,
		recipeSlots: Number,
		recipeIds: [Number],
		dropMonsterIds: [],
		bonusIsSecret: Boolean,
		possibleEffects: [
			{
				_type: String,
				targetMask: String,
				duration: Number,
				diceNum: Number,
				random: Number,
				effectId: Number,
				diceSide: Number,
				targetId: Number,
				hidden: Boolean,
				rawZone: String,
				value: Number,
				group: Number
			}
		],
		favoriteSubAreas: [],
		favoriteSubAreasBonus: Number
	})
);
