import React, { useContext } from "react";
import moment from "moment";

import { TrackingContext } from "lib/TrackingContext";
import LogType from "./Log.lib/LogType";
import LogSubType from "./Log.lib/LogSubType";
import LogTime from "./Log.lib/LogTime";
import LogAdditional from "./Log.lib/LogAdditional";
import LogCreate from "./Log.lib/LogCreate";

const NewLog = () => {
	const { state, dispatch, currentDay } = useContext(TrackingContext);

	const setCurrType = (e) => {
		if (e.target.value) {
			dispatch({
				type: "SET_CURR_TYPE",
				payload: e.target.value,
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

	const setLogAdditional = (e) => {
		dispatch({
			type: "SET_ADDITIONAL",
			payload: e.target.value,
		});
	};

	return (
		<div className="DailyTracking__InnerContainer">
			<h3 className="Title">Add a new entry</h3>

			<div className="DailyTracking__NewLog">
				<LogType
					type={state.currType}
					types={state.logTypes}
					change={setCurrType}
					editing={true}
				/>
				<LogSubType
					type={state.currType}
					subtype={state.currSubType}
					subtypes={state.logSubTypes}
					change={setCurrSubType}
					editing={true}
				/>
				<LogAdditional
					change={setLogAdditional}
					subtype={state.currSubType}
					text={state.additionalText}
					editing={true}
				/>
				<LogTime
					parent="new"
					onChange={setLogTime}
					isSameDay={
						moment().diff(currentDay.toISOString(), "days") === 0
					}
				/>
				<LogCreate />
			</div>
		</div>
	);
};

export default NewLog;
