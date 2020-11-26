const { model, Schema } = require("mongoose");

const logsSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		dayId: {
			type: Schema.Types.ObjectId,
			ref: "Days",
			required: true,
		},
		typeId: {
			type: Schema.Types.ObjectId,
			ref: "Types",
			required: true,
		},
		subtypeId: {
			type: Schema.Types.ObjectId,
			ref: "Subtypes",
			required: true,
		},
		additional: String,
		timestamp: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("Logs", logsSchema);
