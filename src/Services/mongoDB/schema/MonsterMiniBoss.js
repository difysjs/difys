import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"MonsterMiniBoss",
	new Schema({
		id: Number,
		monsterReplacingId: Number
	})
);
