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
		isSameDay = true,
	}) => {
		const { state, dispatch, options } = useContext(TrackingContext);
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
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		const onTimeChange = (newTime) => {
			if (newTime) {
				const [hours, minutes] = newTime.split(":");
				const parsed = moment(new Date())
					.hours(hours)
					.minutes(minutes)
					.toISOString();

				if (parent === "new")
					dispatch({
						type: "SET_TIME",
						payload: parsed,
					});
				else onChange(parsed);
			}

			setCustomTime(newTime);
		};

		return editing ? (
			<>
				{parent === "new" && state.currSubType && isSameDay ? (
					<div className="DailyTracking__FieldContainer">
						<Select
							name="log_time"
							onChange={onChange}
							value={state.logTime}
							options={options}
							withLabel={false}
							noDefaultOption
							styles={`Time ${state.logTime ? "HasValue" : ""} ${
								state.logTime === "custom" ? "Custom" : ""
							}`}
						/>
					</div>
				) : null}
				{(parent === "new" &&
					state.currSubType &&
					(state.logTime === "custom" ||
						!isSameDay ||
						!options.find((o) => o.id === state.logTime))) ||
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
