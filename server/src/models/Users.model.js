const { model, Schema } = require("mongoose");

const requiredString = {
	type: String,
	required: true,
};

const usersSchema = new Schema(
	{
		first_name: String,
		last_name: String,
		gender: String,
		age: String,
		username: requiredString,
		email: requiredString,
		password: requiredString,
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
