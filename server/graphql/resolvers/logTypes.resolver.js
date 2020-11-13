const { AuthenticationError } = require("apollo-server");

const LogSubTypes = require("../../models/LogSubTypes.model");
const LogTypes = require("../../models/LogTypes.model");
const checkAuth = require("../../util/check-auth");

module.exports = {
	Query: {
		getLogTypes: async () => {
			try {
				const subtypes = await LogTypes.find();
				return subtypes;
			} catch (err) {
				throw new Error(err);
			}
		},
		getLogType: async (_, { typeId }) => {
			try {
				const subtype = await LogTypes.findById(typeId);
				if (subtype) {
					return subtype;
				} else {
					throw new Error("Type not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		createLogType: async (_, { name }, context) => {
			const user = checkAuth(context);

			const newType = new LogTypes({
				userId: user.id,
				name,
			});

			const type = await newType.save();
			return type;
		},
		updateLogType: async (_, { name }, context) => {},
		deleteLogType: async (_, { typeId }, context) => {
			const user = checkAuth(context);

			try {
				const type = await LogTypes.findById(typeId);
				if (user.id === type.userId.toString()) {
					try {
						const logSubTypes = await LogSubTypes.find()
							.where("_id")
							.in(type.subtypes)
							.exec();
						logSubTypes.forEach(async (logSubType) => {
							try {
								await logSubType.delete();
							} catch (err) {
								throw new Error(err);
							}
						});
					} catch (err) {
						throw new Error(err);
					}

					await type.delete();

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
