export const getNameValuePairs = (formState) => {
	if (formState) {
		const pairs = {};
		Object.keys(formState).forEach((key) => {
			pairs[key] = formState[key].value;
		});
		return pairs;
	}
};
