const { model, Schema } = require("mongoose");

const logSubTypesSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		typeId: {
			type: Schema.Types.ObjectId,
			ref: "LogTypes",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("LogSubTypes", logSubTypesSchema);
