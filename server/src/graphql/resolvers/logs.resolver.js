const { AuthenticationError } = require("apollo-server");

const Days = require("../../models/Days.model");
const Logs = require("../../models/Logs.model");
const checkAuth = require("../../util/check-auth");

module.exports = {
	Query: {
		getLogs: async () => {
			try {
				const logs = await Logs.find();
				return logs;
			} catch (err) {
				throw new Error(err);
			}
		},
		getLog: async (_, { logId }) => {
			try {
				const log = await Logs.findById(logId);
				if (log) {
					return log;
				} else {
					throw new Error("Type not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		getLogsByIds: async (_, { ids }) => {
			try {
				const logs = await Logs.find().where("_id").in(ids).exec();
				return logs;
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		createLog: async (
			_,
			{ dayId, typeId, subtypeId, additional, timestamp },
			context
		) => {
			const user = checkAuth(context);

			const newLog = new Logs({
				userId: user.id,
				dayId,
				typeId,
				subtypeId,
				additional,
				timestamp,
			});

			const log = await newLog.save();

			try {
				const day = await Days.findById(dayId);
				day.logs.push(log._id);
				await day.save();
			} catch (err) {
				throw new Error(err);
			}

			return log;
		},
		updateLog: async (
			_,
			{ id, typeId, subtypeId, additional, timestamp },
			context
		) => {
			const user = checkAuth(context);

			try {
				const log = await Logs.findByIdAndUpdate(
					id,
					{ typeId, subtypeId, additional, timestamp },
					{ new: true }
				);

				return log;
			} catch (err) {
				throw new Error(err);
			}
		},
		deleteLog: async (_, { logId }, context) => {
			const user = checkAuth(context);

			try {
				const log = await Logs.findById(logId);
				if (user.id === log.userId.toString()) {
					await log.delete();

					try {
						const day = await Days.findById(log.dayId);
						day.logs.remove(log._id);
						await day.save();
					} catch (err) {
						throw new Error(err);
					}

					return "Log data deleted!";
				} else {
					throw new AuthenticationError("Action not allowed");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
