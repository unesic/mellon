import React, { useEffect, useReducer } from "react";
import { useLazyQuery } from "@apollo/client";
import moment from "moment";

import { USER_LOG_TYPES, USER_LOG_SUB_TYPES } from "lib/graphql/logTypeQueries";
import {
	reducer,
	initialState,
	logTimeOptions,
} from "lib/reducers/newEntryReducer";

import LogType from "components/LogType";
import LogSubType from "components/LogSubType";
import LogTime from "components/LogTime";

const NewEntry = ({ date }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const [getUserLogTypes] = useLazyQuery(USER_LOG_TYPES, {
		onCompleted({ getUserLogTypes }) {
			dispatch({
				type: "SET_TYPES",
				payload: getUserLogTypes,
			});
		},
		onError(err) {
			console.log(err);
		},
	});

	const [getLogTypeSubTypes] = useLazyQuery(USER_LOG_SUB_TYPES, {
		fetchPolicy: "no-cache",
		onCompleted({ getLogTypeSubTypes }) {
			dispatch({
				type: "SET_SUB_TYPES",
				payload: getLogTypeSubTypes,
			});
		},
		onError(err) {
			console.log(JSON.stringify(err, null, 2));
		},
	});

	useEffect(() => {
		getUserLogTypes();
	}, [getUserLogTypes]);

	const setCurrType = (e) => {
		if (e.target.value) {
			dispatch({
				type: "SET_CURR_TYPE",
				payload: e.target.value,
			});

			getLogTypeSubTypes({
				variables: { typeId: e.target.value },
			});
		} else {
			dispatch({
				type: "REST_FROM_TYPE",
			});
		}
	};

	const setCurrSubType = (e) => {
		dispatch({
			type: "SET_CURR_SUBTYPE",
			payload: e.target.value || null,
		});
	};

	const setLogTime = (e) => {
		dispatch({
			type: "SET_TIME",
			payload: e.target.value,
		});
	};

	return (
		<div className="DailyTracking__Wrapper">
			<div className="DailyTracking__Container">
				<h2 className="DailyTracking__Title">
					{moment(date).format("dddd, MMMM Do")}
				</h2>

				<div className="flex">
					<LogType
						logTypes={state.logTypes}
						currType={state.currType}
						onChange={setCurrType}
					/>
					{state.currType ? (
						<>
							<LogSubType
								logSubTypes={state.logSubTypes}
								currSubType={state.currSubType}
								onChange={setCurrSubType}
							/>
							{state.currSubType ? (
								<LogTime
									logTime={state.logTime}
									options={logTimeOptions}
									onChange={setLogTime}
								/>
							) : null}
						</>
					) : null}
				</div>

				<pre className="text-xs">{JSON.stringify(state, null, 2)}</pre>
			</div>
		</div>
	);
};

export default NewEntry;
