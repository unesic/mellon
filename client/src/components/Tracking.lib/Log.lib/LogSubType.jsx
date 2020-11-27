import React, { useContext, useEffect, useState } from "react";

import { TrackingContext } from "lib/TrackingContext";
import { Select } from "ui/Form";

const LogSubType = React.memo(
	({
		parent = "entry",
		currType = null,
		currSubType = null,
		logSubTypes = [],
		onChange,
		editing = true,
		data = {},
	}) => {
		const { state } = useContext(TrackingContext);

		const [subTypes, setSubTypes] = useState([]);
		const [color, setColor] = useState("");

		useEffect(() => {
			if (parent === "new" && state.currType) {
				setSubTypes(state.logSubTypes);
			}
		}, [state.currType, state.logSubTypes]);

		useEffect(() => {
			if (parent === "entry" && currType && logSubTypes.length) {
				setSubTypes(logSubTypes);
			}
		}, [currType, logSubTypes]);

		useEffect(() => {
			if (subTypes.length && state.currSubType) {
				const { color } = subTypes.find(
					(type) => type.id === state.currSubType
				);
				setColor(color);
			} else {
				setColor("");
			}
		}, [subTypes, state.currSubType]);

		useEffect(() => {
			if (subTypes.length && currSubType) {
				const { color } = subTypes.find(
					(type) => type.id === currSubType
				);
				setColor(color);
			} else {
				setColor("");
			}
		}, [subTypes, currSubType]);

		return (
			<div className="DailyTracking__FieldContainer">
				{editing ? (
					parent === "new" && state.currType ? (
						<Select
							name="log_time"
							onChange={onChange}
							value={state.currSubType}
							placeholder="Sub-type"
							options={subTypes}
							withLabel={false}
							styles={`DailyTracking__SelectInput ${
								state.currSubType ? "HasValue" : ""
							}`}
							style={{ backgroundColor: color ? color : null }}
						/>
					) : parent === "entry" && currType ? (
						<Select
							name="log_time"
							onChange={onChange}
							value={currSubType}
							placeholder="Sub-type"
							options={subTypes}
							withLabel={false}
							styles={`DailyTracking__SelectInput ${
								currSubType ? "HasValue" : ""
							}`}
							style={{ backgroundColor: color ? color : null }}
						/>
					) : null
				) : (
					<div
						className="DailyTracking__SelectInput"
						style={{ backgroundColor: data.color || null }}
					>
						{data.name}
					</div>
				)}
			</div>
		);
	}
);

export default LogSubType;
