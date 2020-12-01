import React, { createContext, useEffect, useReducer } from "react";
import { useLazyQuery } from "@apollo/client";
import moment from "moment";

import { GET_LOG_TYPES } from "lib/graphql/logType.queries";
import { GET_LOG_SUBTYPES_FROM_IDS } from "lib/graphql/logSubType.queries";
import { DAY_FROM_UID_AND_DATE } from "lib/graphql/day.queries";

import { initialState, reducer, options } from "./TrackingContext.lib";

const TrackingContext = createContext({
	state: {},
	dispatch: () => {},
	options: [],
	currentDay: "",
	getLogSubTypesFromIds: () => {},
	getUserLogTypes: () => {},
	getDayFromDate: () => {},
});

const TrackingProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const [getLogSubTypesFromIds] = useLazyQuery(GET_LOG_SUBTYPES_FROM_IDS, {
		fetchPolicy: "no-cache",
		onCompleted({ getLogSubTypesFromIds }) {
			dispatch({
				type: "SET_SUB_TYPES",
				payload: getLogSubTypesFromIds,
			});
		},
		onError(err) {
			console.log(JSON.stringify(err, null, 2));
		},
	});

	const [getUserLogTypes] = useLazyQuery(GET_LOG_TYPES, {
		fetchPolicy: "no-cache",
		onCompleted({ getUserLogTypes }) {
			dispatch({
				type: "SET_TYPES",
				payload: getUserLogTypes,
			});

			const ids = [];
			getUserLogTypes.forEach((logType) => {
				logType.subtypes.forEach((subtype) => ids.push(subtype));
			});
			getLogSubTypesFromIds({
				variables: { ids: ids },
			});
		},
		onError(err) {
			console.log(JSON.stringify(err, null, 2));
		},
	});

	const [getDayFromDate] = useLazyQuery(DAY_FROM_UID_AND_DATE, {
		fetchPolicy: "no-cache",
		variables: { date: moment(props.currentDay).format("DD[/]MM[/]YYYY") },
		onCompleted({ getDayFromDate }) {
			dispatch({
				type: "SET_DAY",
				payload: getDayFromDate,
			});
		},
	});

	useEffect(() => {
		getUserLogTypes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch({
			type: "DAY_CHANGED",
		});
		getDayFromDate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.currentDay]);

	useEffect(() => {
		dispatch({
			type: "SET_CURR_SUBTYPE",
			payload: null,
		});
	}, [state.currType]);

	return (
		<TrackingContext.Provider
			value={{
				state: state,
				dispatch: dispatch,
				options: options,
				currentDay: props.currentDay,
				getLogSubTypesFromIds: getLogSubTypesFromIds,
				getUserLogTypes: getUserLogTypes,
				getDayFromDate: getDayFromDate,
			}}
			{...props}
		/>
	);
};

export { TrackingContext, TrackingProvider };
