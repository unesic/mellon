import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Timepicker from "react-time-picker";

import { TrackingContext } from "lib/TrackingContext";
import { Select } from "ui/Form";

const LogTime = ({
	parent = "entry",
	currSubType = null,
	logTime = null,
	onChange,
	editing = true,
	timestamp = "",
}) => {
	const { state, dispatch, options: stateOptions } = useContext(
		TrackingContext
	);
	const [customTime, setCustomTime] = useState("");

	useEffect(() => {
		if (parent === "entry") {
			const hours = moment(logTime).hours();
			const minutes = moment(logTime).minutes();
			const formatted = `${hours}:${minutes}`;
			setCustomTime(formatted);
		}
	}, []);

	const onTimeChange = (newTime) => {
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

	return editing ? (
		parent === "new" && state.currSubType ? (
			state.logTime === "custom" ||
			!stateOptions.find((o) => o.value === state.logTime) ? (
				<Timepicker
					value={customTime}
					onChange={onTimeChange}
					format="hh:mm a"
					className="TimePicker"
					clearIcon={null}
					disableClock
				/>
			) : (
				<Select
					name="log_time"
					onChange={onChange}
					value={state.logTime}
					options={stateOptions}
					withLabel={false}
					styles={`DailyTracking__SelectInput Time ${
						state.logTime ? "HasValue" : ""
					}`}
				/>
			)
		) : currSubType ? (
			<Timepicker
				value={customTime}
				onChange={onTimeChange}
				format="hh:mm a"
				className="TimePicker"
				clearIcon={null}
				disableClock
			/>
		) : null
	) : (
		<div className="DailyTracking__Timestamp">
			AT {moment(timestamp).format("HH[:]mm")}
		</div>
	);
};

export default LogTime;
