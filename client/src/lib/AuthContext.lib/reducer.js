export const reducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
			};
		case "SET_IMAGE":
			return {
				...state,
				image: action.payload,
			};
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
				image: {},
			};
		default:
			return state;
	}
};
