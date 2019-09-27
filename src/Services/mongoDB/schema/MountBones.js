import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"MountBones",
	new Schema({
		id: Number
	})
);
