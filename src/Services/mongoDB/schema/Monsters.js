import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Monsters",
	new Schema({
		_type: String,
		id: Number,
		nameId: String,
		gfxId: Number,
		race: Number,
		grades: [
			{
				_type: String,
				grade: Number,
				monsterId: Number,
				level: Number,
				lifePoints: Number,
				lifepointsRatio: Number,
				actionPoints: Number,
				movementPoints: Number,
				paDodge: Number,
				pmDodge: Number,
				wisdom: Number,
				earthResistance: Number,
				airResistance: Number,
				fireResistance: Number,
				waterResistance: Number,
				neutralResistance: Number,
				gradeXp: Number
			}
		],
		look: String,
		useSummonSlot: Boolean,
		useBombSlot: Boolean,
		canPlay: Boolean,
		animFunList: [
			{
				_type: String,
				animName: String,
				animWeight: Number
			}
		],
		canTackle: Boolean,
		isBoss: Boolean,
		drops: [
			{
				_type: String,
				dropId: Number,
				monsterId: Number,
				objectId: Number,
				percentDropForGrade1: Number,
				percentDropForGrade2: Number,
				percentDropForGrade3: Number,
				percentDropForGrade4: Number,
				percentDropForGrade5: Number,
				count: Number,
				findCeil: Number,
				hasCriteria: Boolean
			}
		],
		subareas: [Number],
		spells: [Number],
		favoriteSubareaId: Number,
		isMiniBoss: Boolean,
		isQuestMonster: Boolean,
		correspondingMiniBossId: Number
	})
);
