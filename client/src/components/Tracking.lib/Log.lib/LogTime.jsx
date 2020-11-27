import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Timepicker from "react-time-picker";

import { TrackingContext } from "lib/TrackingContext";
import { Select } from "ui/Form";

const LogTime = React.memo(
	({
		parent = "entry",
		currSubType = null,
		logTime = null,
		onChange,
		editing = true,
		timestamp = "",
		notSameDay = false,
	}) => {
		const { state, dispatch, options: stateOptions } = useContext(
			TrackingContext
		);
		const [customTime, setCustomTime] = useState("");

		useEffect(() => {
			if (parent === "entry") {
				const hours = moment(logTime).hours();
				const minutes = moment(logTime).minutes();
				const trailingZero = minutes < 10;
				const formatted = `${hours}:${
					trailingZero ? "0" : ""
				}${minutes}`;
				setCustomTime(formatted);
			}
		}, []);

		const onTimeChange = (newTime) => {
			console.log("onTimeChange");
			if (newTime) {
				const [hours, minutes] = newTime.split(":");
				const parsed = moment(new Date())
					.hours(hours)
					.minutes(minutes)
					.toISOString();

				if (parent === "new") {
					dispatch({
						type: "SET_TIME",
						payload: parsed,
					});
				} else {
					onChange(parsed);
				}
			}

			setCustomTime(newTime);
		};

		// if (editing) {
		// 	if (parent === "new" && state.currSubType && !notSameDay) {
		// 		// display select
		// 	}

		// 	if (state.logTime === "custom" || notSameDay || !stateOptions.find((o) => o.value === state.logTime || (parent === "entry" && currSubType)) {
		// 		// display timepicker
		// 	}
		// }

		// {editing ? (
		// 	<>
		// 	{parent === "new" && state.currSubType && !notSameDay ? (<Select
		// 		name="log_time"
		// 		onChange={onChange}
		// 		value={state.logTime}
		// 		options={stateOptions}
		// 		withLabel={false}
		// 		styles={`DailyTracking__SelectInput Time ${
		// 			state.logTime ? "HasValue" : ""
		// 		}`}
		// 	/>) : null}
		// 	</>
		// 	<>
		// 	{state.logTime === "custom" || notSameDay || !stateOptions.find((o) => o.value === state.logTime || (parent === "entry" && currSubType) ? (<Timepicker
		// 		value={customTime}
		// 		onChange={onTimeChange}
		// 		format="hh:mm a"
		// 		className="TimePicker"
		// 		clearIcon={null}
		// 		disableClock
		// 	/>) : null}
		// 	</>
		// ) : null}

		return editing ? (
			<>
				<div className="DailyTracking__FieldContainer">
					{parent === "new" && state.currSubType && !notSameDay ? (
						<Select
							name="log_time"
							onChange={onChange}
							value={state.logTime}
							options={stateOptions}
							withLabel={false}
							styles={`DailyTracking__SelectInput Time ${
								state.logTime ? "HasValue" : ""
							} ${state.logTime === "custom" ? "Custom" : ""}`}
						/>
					) : null}
				</div>
				<div className="DailyTracking__FieldContainer">
					{state.logTime === "custom" ||
					notSameDay ||
					!stateOptions.find((o) => o.value === state.logTime) ||
					(parent === "entry" && currSubType) ? (
						<Timepicker
							value={customTime}
							onChange={onTimeChange}
							format="hh:mm a"
							className="TimePicker"
							clearIcon={null}
							disableClock
						/>
					) : null}
				</div>
			</>
		) : (
			<div className="DailyTracking__FieldContainer">
				<div className="DailyTracking__Timestamp">
					AT {moment(timestamp).format("HH[:]mm")}
				</div>
			</div>
		);
	}
);

export default LogTime;
