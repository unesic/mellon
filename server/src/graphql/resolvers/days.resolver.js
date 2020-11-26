const { AuthenticationError } = require("apollo-server");

const Days = require("../../models/Days.model");
const Users = require("../../models/Users.model");
const checkAuth = require("../../util/check-auth");

module.exports = {
	Query: {
		getDays: async () => {
			try {
				const days = await Days.find();
				return days;
			} catch (err) {
				throw new Error(err);
			}
		},
		getDay: async (_, { dayId }) => {
			try {
				const day = await Days.findById(dayId);
				if (day) {
					return day;
				} else {
					throw new Error("Day not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		getDayFromDate: async (_, { date }, context) => {
			const user = checkAuth(context);

			try {
				const day = await Days.findOne({ userId: user.id, date: date });
				if (day) {
					return day;
				} else {
					throw new Error("Day not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		createDay: async (_, { date }, context) => {
			const user = checkAuth(context);

			const newDay = new Days({
				userId: user.id,
				date,
			});

			const day = await newDay.save();

			try {
				const sameUser = await Users.findById(user.id);
				sameUser.days.push(day._id);
				await sameUser.save();
			} catch (err) {
				throw new Error(err);
			}

			return day;
		},
		deleteDay: async (_, { dayId }, context) => {
			const user = checkAuth(context);

			try {
				const day = await Days.findById(dayId);
				if (user.id === day.userId.toString()) {
					await day.delete();

					try {
						const sameUser = await Users.findById(user.id);
						sameUser.days.remove(day._id);
						await sameUser.save();
					} catch (err) {
						throw new Error(err);
					}

					return "Day data deleted!";
				} else {
					throw new AuthenticationError("Action not allowed");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
