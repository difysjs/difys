import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"RideFood",
	new Schema({
		gid: Number,
		typeId: Number
	})
);
