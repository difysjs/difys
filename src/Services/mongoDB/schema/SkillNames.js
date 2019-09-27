import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SkillNames",
	new Schema({
		id: Number,
		nameId: String
	})
);
