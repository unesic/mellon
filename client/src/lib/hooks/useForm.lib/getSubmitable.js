export const getSubmitable = (formType, formState, image) => {
	if (formType === "profile") {
		const done = Object.keys(formState)
			.map((key) =>
				key !== "errors"
					? {
							value: formState[key].value,
							name: formState[key].name,
					  }
					: null
			)
			.filter(Boolean)
			.filter((e) => e.value !== "" && e.name !== "image").length;

		return image.blob || done;
	} else {
		const { required } = Object.keys(formState)
			.map((key) =>
				key !== "errors"
					? {
							required: formState[key].required,
					  }
					: null
			)
			.filter(Boolean)
			.reduce((a, b) => ({
				required: a.required + b.required,
			}));

		const done = Object.keys(formState)
			.map((key) => ({
				value: formState[key].value,
				required: formState[key].required,
			}))
			.filter((e) => e.value !== "" && e.required).length;

		return required === done;
	}
};
