export const formStateReducer = (state, action) => {
	switch (action.type) {
		case "SET_FIELD_VALUE":
			return {
				...state,
				[action.payload.name]: {
					...state[action.payload.name],
					value: action.payload.value,
				},
			};
		case "SET_FIELD_ERROR":
			return {
				...state,
				[action.payload.name]: {
					...state[action.payload.name],
					error: action.payload.value,
				},
			};
		case "SET_FORM_ERROR":
			return {
				...state,
				errors: {
					[action.payload.name]: action.payload.value,
				},
			};
		case "RESET_FORM":
			return {
				...action.payload,
			};
		default:
			return state;
	}
};
