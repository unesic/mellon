const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
	validateRegisterInput,
	validateLoginInput,
	validateUpdateInput,
} = require("../../util/validators");
const Users = require("../../models/Users.model");

const generateToken = (user) => {
	return jwt.sign(
		{
			id: user._id,
			email: user.email,
			name: user.name,
			image: user.image,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "1h" }
	);
};

module.exports = {
	Query: {
		getUsers: async () => {
			try {
				const user = await Users.find();
				return user;
			} catch (err) {
				throw new Error(err);
			}
		},
		getUser: async (_, { userId }) => {
			try {
				const user = await Users.findById(userId);
				if (user) {
					return user;
				} else {
					throw new Error("User not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		register: async (_, { email, password, rePassword, name, image }) => {
			const { valid, errors } = validateRegisterInput(
				email,
				password,
				rePassword,
				name,
				image
			);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const user = await Users.findOne({ email });

			if (user) {
				throw new UserInputError("Email is taken", {
					errors: {
						email: "This email is taken",
					},
				});
			}

			password = await bcrypt.hash(password, 12);

			const newUser = new Users({
				email,
				password,
				name,
				image,
			});
			const res = await newUser.save();
			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
		login: async (_, { email, password }) => {
			const { errors, valid } = validateLoginInput(email, password);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const user = await Users.findOne({ email });

			if (!user) {
				errors.general = "User not found";
				throw new UserInputError("User not found", { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = "Wrong credentials";
				throw new UserInputError("Wrong credentials", { errors });
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id: user._id,
				token,
			};
		},
		update: async (_, { id, email, password, rePassword, name, image }) => {
			const { valid, errors } = validateUpdateInput(
				email,
				password,
				rePassword
			);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const user = await Users.findOne({ email });

			if (user && user.id !== id) {
				throw new UserInputError("Email is taken", {
					errors: {
						email: "This email is taken",
					},
				});
			}

			const currUser = await Users.findById(id);

			if (password) {
				password = await bcrypt.hash(password, 12);
			}

			const res = await Users.findByIdAndUpdate(
				id,
				{
					email: email || currUser.email,
					password: password || currUser.password,
					name: name || currUser.name,
					image: image || currUser.image,
				},
				{ new: true }
			);

			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
	},
};
