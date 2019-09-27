import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"AbuseReasons",
	new Schema({
		_abuseReasonId: Number,
		_mask: Number,
		_reasonTextId: String
	})
);
