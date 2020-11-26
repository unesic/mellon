import { options } from "./options";

export const initialState = {
	logTypes: [],
	logSubTypes: [],
	currType: null,
	currSubType: null,
	logTime: options[0].value,
	dayData: {},
	additionalText: "",
};
