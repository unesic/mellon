import React, { useEffect, useState } from "react";

import { Select } from "ui/Form";

const LogSubType = ({ type, subtype, subtypes, change, editing, data }) => {
	const [color, setColor] = useState("");

	useEffect(() => {
		if (subtypes.length && subtype)
			setColor(subtypes.find((t) => t.id === subtype).color);
		else setColor("");
	}, [subtype, subtypes]);

	return (
		<div className="DailyTracking__FieldContainer">
			{editing ? (
				type ? (
					<Select
						name="log_time"
						onChange={change}
						value={subtype}
						placeholder="Sub-type"
						options={subtypes}
						withLabel={false}
						styles={subtype ? "HasValue" : ""}
						style={{ backgroundColor: color }}
						noDefaultOption
					/>
				) : null
			) : (
				data && (
					<div
						className="Select__ToggleBtn"
						style={{ backgroundColor: data.color }}
					>
						{data.name}
					</div>
				)
			)}
		</div>
	);
};

export default LogSubType;
