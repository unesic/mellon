import React, { useContext, useEffect, useState } from "react";

import { TrackingContext } from "lib/TrackingContext";
import { Select } from "ui/Form";

const LogType = React.memo(
	({
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
			if (parent === "new") setTypes(state.logTypes);
		}, [state.logTypes]);

		useEffect(() => {
			if (parent === "entry" && logTypes.length) setTypes(logTypes);
		}, [logTypes]);

		useEffect(() => {
			if (parent === "new") {
				if (types.length && state.currType) {
					const { color } = types.find(
						(type) => type.id === state.currType
					);
					setColor(color);
				} else {
					setColor("");
				}
			}
		}, [types, state.currType]);

		useEffect(() => {
			if (parent === "entry") {
				if (types.length && currType) {
					const { color } = types.find(
						(type) => type.id === currType
					);
					setColor(color);
				} else {
					setColor("");
				}
			}
		}, [types, currType]);

		return (
			<div className="DailyTracking__FieldContainer">
				{editing ? (
					parent === "new" ? (
						<Select
							name="log_type"
							onChange={onChange}
							value={state.currType}
							placeholder="Type"
							options={types}
							withLabel={false}
							styles={`DailyTracking__SelectInput WithTransition ${
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
							styles={`DailyTracking__SelectInput WithTransition ${
								currType ? "HasValue" : ""
							}`}
							style={{ backgroundColor: color ? color : null }}
						/>
					)
				) : (
					<div
						className="DailyTracking__SelectInput WithTransition"
						style={{ backgroundColor: data.color || null }}
					>
						{data.name}
					</div>
				)}
			</div>
		);
	}
);

export default LogType;
