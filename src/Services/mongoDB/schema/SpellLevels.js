import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SpellLevels",
	new Schema({
		_type: String,
		id: Number,
		spellId: Number,
		spellBreed: Number,
		apCost: Number,
		minRange: Number,
		range: Number,
		castInLine: Boolean,
		castInDiagonal: Boolean,
		castTestLos: Boolean,
		criticalHitProbability: Number,
		criticalFailureProbability: Number,
		needFreeCell: Boolean,
		needTakenCell: Boolean,
		needFreeTrapCell: Boolean,
		rangeCanBeBoosted: Boolean,
		maxStack: Number,
		maxCastPerTurn: Number,
		maxCastPerTarget: Number,
		minCastInterval: Number,
		initialCooldown: Number,
		globalCooldown: Number,
		minPlayerLevel: Number,
		criticalFailureEndsTurn: Boolean,
		hideEffects: Boolean,
		hidden: Boolean,
		statesRequired: [],
		statesForbidden: [],
		effects: [
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
		criticalEffect: [
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
		canSummon: Boolean,
		canBomb: Boolean
	})
);
