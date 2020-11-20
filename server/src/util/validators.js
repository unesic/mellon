module.exports.validateRegisterInput = (
	username,
	image,
	email,
	password,
	rePassword
) => {
	const errors = {};

	if (username.trim() === "") {
		errors.username = "Username must not be empty";
	} else {
		const regEx = /[^A-Za-z0-9_]/;
		if (username.match(regEx)) {
			errors.username =
				"Username can only contain uppercase and lowercase letters, numbers and underscores (A-Za-z0-9_)";
		}
	}

	if (image.trim() === "") {
		errors.image = "Image must not be empty";
	}

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
	username = "",
	email = "",
	password = "",
	rePassword = ""
) => {
	const errors = {};

	const usernameRegEx = /[^A-Za-z0-9_]/;
	if (username.match(usernameRegEx)) {
		errors.username =
			"Username can only contain uppercase and lowercase letters, numbers and underscores (A-Za-z0-9_)";
	}

	const emailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
	if (email.trim() !== "" && !email.match(emailRegEx)) {
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

module.exports.validateFileUpload = (mimetype) => {
	const errors = {};

	if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
		errors.image = "File format must be either PNG or JPEG";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};
