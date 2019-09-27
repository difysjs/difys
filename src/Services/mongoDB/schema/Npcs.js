import mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.model(
	"Npcs",
	new Schema({
		_type: String,
		id: Number,
		nameId: String,
		dialogMessages: [],
		dialogReplies: [],
		actions: [Number],
		gender: Number,
		look: String,
		animFunList: [
			{
				_type: String,
				animName: String,
				animWeight: Number
			}
		]
	})
);
