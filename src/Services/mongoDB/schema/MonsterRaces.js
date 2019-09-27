import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"MonsterRaces",
	new Schema({
		id: Number,
		superRaceId: Number,
		nameId: String,
		monsters: [Number]
	})
);
