import React, { useContext, useMemo } from "react";
import moment from "moment";

import { TrackingContext } from "lib/TrackingContext";
import LogType from "./Log.lib/LogType";
import LogSubType from "./Log.lib/LogSubType";
import LogTime from "./Log.lib/LogTime";
import LogAdditional from "./Log.lib/LogAdditional";
import LogCreate from "./Log.lib/LogCreate";

const NewLog = React.memo(() => {
	const { state, dispatch, currentDay: date } = useContext(TrackingContext);

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

	const isDateSameMemo = useMemo(
		() => moment().diff(date.toISOString(), "days") === 0
	);

	return (
		<div className="DailyTracking__InnerContainer">
			<h3 className="Title">Add a new entry</h3>

			<div className="DailyTracking__NewLog">
				<LogType parent="new" onChange={setCurrType} />
				<LogSubType parent="new" onChange={setCurrSubType} />
				<LogAdditional parent="new" onChange={setLogAdditional} />
				<LogTime
					parent="new"
					onChange={setLogTime}
					notSameDay={!isDateSameMemo}
				/>
				<LogCreate />
			</div>
			{/* <pre className="text-xs">{JSON.stringify(state, null, 2)}</pre> */}
		</div>
	);
});

export default NewLog;
