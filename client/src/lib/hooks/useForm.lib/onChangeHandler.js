export const onChangeHandler = (e, dispatchFormState) => {
	dispatchFormState({
		type: "SET_FIELD_VALUE",
		payload: {
			name: e.target.name,
			value:
				e.target.type === "checkbox"
					? e.target.checked
					: e.target.value,
		},
	});
};
