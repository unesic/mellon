const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
	validateRegisterInput,
	validateLoginInput,
	validateUpdateInput,
} = require("../../util/validators");
const checkAuth = require("../../util/check-auth");
const Users = require("../../models/Users.model");

const generateToken = (user, remember) => {
	return jwt.sign(
		{
			id: user._id,
			first_name: user.first_name,
			last_name: user.last_name,
			gender: user.gender,
			age: user.age,
			username: user.username,
			image: user.image,
			email: user.email,
		},
		process.env.JWT_SECRET,
		remember ? {} : { expiresIn: "1h" }
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
		register: async (
			_,
			{
				first_name,
				last_name,
				gender,
				age,
				image,
				username,
				email,
				password,
				rePassword,
			}
		) => {
			const { valid, errors } = validateRegisterInput(
				username,
				image,
				email,
				password,
				rePassword
			);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const userMail = await Users.findOne({ email });
			const userName = await Users.findOne({ username });

			if (userMail) {
				throw new UserInputError("Email is taken", {
					errors: {
						email: "This email is taken",
					},
				});
			}

			if (userName) {
				throw new UserInputError("Username is taken", {
					errors: {
						email: "This username is taken",
					},
				});
			}

			password = await bcrypt.hash(password, 12);

			const newUser = new Users({
				first_name,
				last_name,
				gender,
				age,
				username,
				image,
				email,
				password,
			});
			const res = await newUser.save();
			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
		login: async (_, { email, password, remember }) => {
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

			const token = generateToken(user, remember);

			return {
				...user._doc,
				id: user._id,
				token,
			};
		},
		update: async (
			_,
			{
				id,
				first_name,
				last_name,
				gender,
				age,
				image,
				username,
				email,
				password,
				rePassword,
			}
		) => {
			const { valid, errors } = validateUpdateInput(
				username,
				email,
				password,
				rePassword
			);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const userMail = await Users.findOne({ email });
			const userName = await Users.findOne({ username });

			if (userMail && userMail.id !== id) {
				throw new UserInputError("Email is taken", {
					errors: {
						email: "This email is taken",
					},
				});
			}

			if (userName && userName.id !== id) {
				throw new UserInputError("Username is taken", {
					errors: {
						email: "This username is taken",
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
					first_name: first_name || currUser.first_name,
					last_name: last_name || currUser.last_name,
					gender: gender || currUser.gender,
					age: age || currUser.age,
					image: image || currUser.image,
					username: username || currUser.username,
					email: email || currUser.email,
					password: password || currUser.password,
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
