import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Skills",
	new Schema({
		id: Number,
		nameId: String,
		parentJobId: Number,
		isForgemagus: Boolean,
		modifiableItemType: Number,
		gatheredRessourceItem: Number,
		craftableItemIds: [Number],
		interactiveId: Number,
		useAnimation: String,
		isRepair: Boolean,
		cursor: Number,
		availableInHouse: Boolean,
		levelMin: Number
	})
);
