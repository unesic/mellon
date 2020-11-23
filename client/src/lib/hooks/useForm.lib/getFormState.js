export const getFormState = (fields) => {
	const state = { errors: {} };

	fields.forEach((f) => {
		state[f.name] = {
			type: f.type || "text",
			name: f.name,
			label: f.label,
			required: f.required || false,
			value: f.type === "checkbox" ? f.value || false : f.value || "",
			placeholder: f.placeholder || "",
			options: f.options || null,
			error: "",
			width: `w-${f.width || "full"}`,
		};
	});

	return state;
};
