import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"MonsterSuperRaces",
	new Schema({
		id: Number,
		nameId: String
	})
);
