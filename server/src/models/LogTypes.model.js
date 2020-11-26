const { model, Schema } = require("mongoose");

const logtypesSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		color: String,
		subtypes: {
			type: [Schema.Types.ObjectId],
			ref: "LogSubTypes",
			required: false,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("LogTypes", logtypesSchema);
