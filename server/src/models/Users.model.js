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
		image: requiredString,
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