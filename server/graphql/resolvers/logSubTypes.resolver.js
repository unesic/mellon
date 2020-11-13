const { AuthenticationError } = require("apollo-server");

const LogTypes = require("../../models/LogTypes.model");
const LogSubTypes = require("../../models/LogSubTypes.model");
const checkAuth = require("../../util/check-auth");

module.exports = {
	Query: {
		getLogSubTypes: async () => {
			try {
				const subtypes = await LogSubTypes.find();
				return subtypes;
			} catch (err) {
				throw new Error(err);
			}
		},
		getLogSubType: async (_, { subtypeId }) => {
			try {
				const subtype = await LogSubTypes.findById(subtypeId);
				if (subtype) {
					return subtype;
				} else {
					throw new Error("Subtype not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		createLogSubType: async (_, { typeId, name }, context) => {
			const user = checkAuth(context);

			const newSubtype = new LogSubTypes({
				userId: user.id,
				typeId,
				name,
			});

			const subtype = await newSubtype.save();

			try {
				const type = await LogTypes.findById(typeId);
				type.subtypes.push(subtype._id);
				await type.save();
			} catch (err) {
				throw new Error(err);
			}

			return subtype;
		},
		updateLogSubType: async (_, { name }, context) => {},
		deleteLogSubType: async (_, { subtypeId }, context) => {
			const user = checkAuth(context);

			try {
				const subtype = await LogSubTypes.findById(subtypeId);
				if (user.id === subtype.userId.toString()) {
					await subtype.delete();

					try {
						const logType = await LogTypes.findById(subtype.typeId);
						logType.subtypes.remove(subtype._id);
						await logType.save();
					} catch (err) {
						throw new Error(err);
					}

					return "Subtype data deleted!";
				} else {
					throw new AuthenticationError("Action not allowed");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
