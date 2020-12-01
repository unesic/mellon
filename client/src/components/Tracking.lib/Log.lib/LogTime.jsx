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

		return editing ? (
			<>
				{parent === "new" && state.currSubType && !notSameDay ? (
					<div className="DailyTracking__FieldContainer">
						<Select
							name="log_time"
							onChange={onChange}
							value={state.logTime}
							options={stateOptions}
							withLabel={false}
							styles={`DailyTracking__SelectInput WithTransition Time ${
								state.logTime ? "HasValue" : ""
							} ${state.logTime === "custom" ? "Custom" : ""}`}
						/>
					</div>
				) : null}
				{(state.currSubType &&
					parent === "new" &&
					state.currSubType &&
					(state.logTime === "custom" ||
						notSameDay ||
						!stateOptions.find(
							(o) => o.value === state.logTime
						))) ||
				(parent === "entry" && currSubType) ? (
					<div className="DailyTracking__FieldContainer">
						<Timepicker
							value={customTime}
							onChange={onTimeChange}
							format="hh:mm a"
							className="TimePicker"
							clearIcon={null}
							disableClock
						/>
					</div>
				) : null}
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
