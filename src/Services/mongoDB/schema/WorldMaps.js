import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"WorldMaps",
	new Schema({
		id: Number,
		origineX: Number,
		origineY: Number,
		mapWidth: Number,
		mapHeight: Number,
		horizontalChunck: Number,
		verticalChunck: Number,
		viewableEverywhere: Boolean,
		minScale: Number,
		maxScale: Number,
		startScale: Number,
		centerX: Number,
		centerY: Number,
		totalWidth: Number,
		totalHeight: Number,
		zoom: [String]
	})
);
