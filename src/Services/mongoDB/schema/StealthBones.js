import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"StealthBones",
	new Schema({
		id: Number
	})
);
