export const setErrors = (errors, dispatchFormState) => {
	Object.keys(errors).forEach((key) => {
		dispatchFormState({
			type: key === "general" ? "SET_FORM_ERROR" : "SET_FIELD_ERROR",
			payload: {
				name: key,
				value: errors[key],
			},
		});
	});
};
