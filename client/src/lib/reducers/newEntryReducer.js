import moment from "moment";

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
		case "REST_FROM_TYPE":
			return {
				...state,
				logSubTypes: [],
				currType: null,
				currSubType: null,
			};
		default:
			return state;
	}
};

export const logTimeOptions = [
	{
		value: moment(new Date()).toISOString(),
		label: "Just now",
	},
	{
		value: moment(new Date()).subtract(5, "minutes").toISOString(),
		label: moment(new Date()).subtract(5, "minutes").fromNow(),
	},
	{
		value: moment(new Date()).subtract(10, "minutes").toISOString(),
		label: moment(new Date()).subtract(10, "minutes").fromNow(),
	},
	{
		value: moment(new Date()).subtract(15, "minutes").toISOString(),
		label: moment(new Date()).subtract(15, "minutes").fromNow(),
	},
	{
		value: moment(new Date()).subtract(30, "minutes").toISOString(),
		label: moment(new Date()).subtract(30, "minutes").fromNow(),
	},
	{
		value: moment(new Date()).subtract(1, "hours").toISOString(),
		label: moment(new Date()).subtract(1, "hours").fromNow(),
	},
	{
		value: moment(new Date()).subtract(2, "hours").toISOString(),
		label: moment(new Date()).subtract(2, "hours").fromNow(),
	},
	{
		value: moment(new Date()).subtract(3, "hours").toISOString(),
		label: moment(new Date()).subtract(3, "hours").fromNow(),
	},
];

export const initialState = {
	logTypes: [],
	logSubTypes: [],
	currType: null,
	currSubType: null,
	logTime: logTimeOptions[0].value,
};
