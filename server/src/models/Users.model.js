const { model, Schema } = require("mongoose");

const requiredString = {
	type: String,
	required: true,
};

const usersSchema = new Schema(
	{
		email: requiredString,
		password: requiredString,
		name: requiredString,
		image: {
			type: Schema.Types.ObjectId,
			ref: "Files",
		},
		days: {
			type: [Schema.Types.ObjectId],
			ref: "Days",
			required: false,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("Users", usersSchema);
