import React, { useContext, useEffect, useState } from "react";

import { TrackingContext } from "lib/TrackingContext";
import { Select } from "ui/Form";

const LogType = ({
	parent = "entry",
	currType = null,
	logTypes = [],
	onChange,
	editing = true,
	data = {},
}) => {
	const { state } = useContext(TrackingContext);

	const [types, setTypes] = useState([]);
	const [color, setColor] = useState("");

	useEffect(() => {
		setTypes(state.logTypes);
	}, [state.logTypes]);

	useEffect(() => {
		if (logTypes.length) setTypes(logTypes);
	}, [logTypes]);

	useEffect(() => {
		if (types.length && state.currType) {
			const { color } = types.find((type) => type.id === state.currType);
			setColor(color);
		} else {
			setColor("");
		}
	}, [types, state.currType]);

	useEffect(() => {
		if (types.length && currType) {
			const { color } = types.find((type) => type.id === currType);
			setColor(color);
		} else {
			setColor("");
		}
	}, [types, currType]);

	return editing ? (
		parent === "new" ? (
			<Select
				name="log_type"
				onChange={onChange}
				value={state.currType}
				placeholder="Type"
				options={types}
				withLabel={false}
				styles={`DailyTracking__SelectInput ${
					state.currType ? "HasValue" : ""
				}`}
				style={{ backgroundColor: color ? color : null }}
			/>
		) : (
			<Select
				name="log_type"
				onChange={onChange}
				value={currType}
				placeholder="Type"
				options={types}
				withLabel={false}
				styles={`DailyTracking__SelectInput ${
					currType ? "HasValue" : ""
				}`}
				style={{ backgroundColor: color ? color : null }}
			/>
		)
	) : (
		<span
			className="DailyTracking__SelectInput"
			style={{ backgroundColor: data.color || null }}
		>
			{data.name}
		</span>
	);
};

export default LogType;
