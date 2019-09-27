import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Quests",
	new Schema({
		id: Number,
		nameId: String,
		categoryId: Number,
		isRepeatable: Boolean,
		repeatType: Number,
		repeatLimit: Number,
		isDungeonQuest: Boolean,
		levelMin: Number,
		levelMax: Number,
		stepIds: [Number]
	})
);
