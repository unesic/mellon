module.exports.validateRegisterInput = (
	email,
	password,
	rePassword,
	name,
	image
) => {
	const errors = {};

	if (email.trim() === "") {
		errors.email = "Email must not be empty";
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (!email.match(regEx)) {
			errors.email = "Email must be a valid email address";
		}
	}

	if (password === "") {
		errors.password = "Password must not be empty";

		if (rePassword === "") {
			errors.rePassword = "Re-Password must not be empty";
		}
	} else if (password !== rePassword) {
		errors.rePassword = "Passwords must match";
	}

	if (name.trim() === "") {
		errors.name = "Name must not be empty";
	}

	if (image.trim() === "") {
		errors.image = "Image must not be empty";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

module.exports.validateLoginInput = (email, password) => {
	const errors = {};

	if (email.trim() === "") {
		errors.email = "Email must not be empty";
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (!email.match(regEx)) {
			errors.email = "Email must be a valid email address";
		}
	}

	if (password === "") {
		errors.password = "Password must not be empty";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

module.exports.validateUpdateInput = (
	email = "",
	password = "",
	rePassword = ""
) => {
	const errors = {};

	const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
	if (email.trim() !== "" && !email.match(regEx)) {
		errors.email = "Email must be a valid email address";
	}

	if (password !== rePassword) {
		errors.rePassword = "Passwords must match";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};
