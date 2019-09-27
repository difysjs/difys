import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"SkinMappings",
	new Schema({
		id: Number,
		lowDefId: Number
	})
);
