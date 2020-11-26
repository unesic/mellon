import React, { createContext, useReducer } from "react";

import { initialState, reducer, options } from "./TrackingContext.lib";

const TrackingContext = createContext({
	state: {},
	dispatch: () => {},
	options: [],
});

const TrackingProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<TrackingContext.Provider
			value={{ state: state, dispatch: dispatch, options: options }}
			{...props}
		/>
	);
};

export { TrackingContext, TrackingProvider };
