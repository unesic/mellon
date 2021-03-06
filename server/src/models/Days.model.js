const { model, Schema } = require("mongoose");

const daysSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		logs: {
			type: [Schema.Types.ObjectId],
			ref: "Logs",
			required: false,
			default: [],
		},
		date: String,
	},
	{
		timestamps: true,
	}
);

module.exports = model("Days", daysSchema);
