import { options } from "./options";

export const reducer = (state, action) => {
	switch (action.type) {
		case "SET_TYPES":
			return {
				...state,
				logTypes: action.payload,
			};
		case "SET_SUB_TYPES":
			return {
				...state,
				logSubTypes: action.payload,
			};
		case "SET_CURR_TYPE":
			return {
				...state,
				currType: action.payload,
			};
		case "SET_CURR_SUBTYPE":
			return {
				...state,
				currSubType: action.payload,
			};
		case "SET_TIME":
			return {
				...state,
				logTime: action.payload,
			};
		case "SET_ADDITIONAL":
			return {
				...state,
				additionalText: action.payload,
			};
		case "SET_DAY":
			return {
				...state,
				dayData: { ...action.payload },
			};
		case "ADD_LOG": {
			return {
				...state,
				currType: null,
				currSubType: null,
				additionalText: "",
				logTime: options[0].value,
				dayData: {
					...state.dayData,
					logs: [...state.dayData.logs, action.payload],
				},
			};
		}
		case "REST_FROM_TYPE":
			return {
				...state,
				currType: null,
				currSubType: null,
				additionalText: "",
			};
		case "DAY_CHANGED":
			return {
				...state,
				currType: null,
				currSubType: null,
				additionalText: "",
				dayData: {},
			};
		default:
			return state;
	}
};
