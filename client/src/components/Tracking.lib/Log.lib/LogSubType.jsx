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
				const subtypes = [];
				state.logSubTypes.forEach((subtype) => {
					if (subtype.typeId === state.currType) {
						subtypes.push(subtype);
					}
				});
				setSubTypes(subtypes);
			}
		}, [state.currType, state.logSubTypes]);

		useEffect(() => {
			if (parent === "entry" && currType && logSubTypes.length) {
				const subtypes = [];
				logSubTypes.forEach((subtype) => {
					if (subtype.typeId === currType) {
						subtypes.push(subtype);
					}
				});
				setSubTypes(subtypes);
			}
		}, [currType, logSubTypes]);

		useEffect(() => {
			if (parent === "new") {
				if (subTypes.length && state.currSubType) {
					const { color } = subTypes.find(
						(type) => type.id === state.currSubType
					);
					setColor(color);
				} else {
					setColor("");
				}
			}
		}, [subTypes, state.currSubType]);

		useEffect(() => {
			if (parent === "entry") {
				if (subTypes.length && currSubType) {
					const { color } = subTypes.find(
						(type) => type.id === currSubType
					);
					setColor(color);
				} else {
					setColor("");
				}
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
							styles={`DailyTracking__SelectInput WithTransition ${
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
							styles={`DailyTracking__SelectInput WithTransition ${
								currSubType ? "HasValue" : ""
							}`}
							style={{ backgroundColor: color ? color : null }}
						/>
					) : null
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

export default LogSubType;
