import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"ItemSets",
	new Schema({
		_type: String,
		id: Number,
		items: [Number],
		nameId: String,
		bonusIsSecret: Boolean,
		effects: []
	})
);
