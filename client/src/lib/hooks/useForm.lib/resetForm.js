import { getFormState } from "./getFormState";
import { getSubmitable } from "./getSubmitable";

export const resetForm = (
	formFields,
	formType,
	formState,
	image,
	dispatchFormState,
	setSubmitable
) => {
	const state = getFormState(formFields);
	dispatchFormState({
		type: "RESET_FORM",
		payload: state,
	});

	const isSubmitable = getSubmitable(formType, formState, image);
	setSubmitable(isSubmitable);
};
