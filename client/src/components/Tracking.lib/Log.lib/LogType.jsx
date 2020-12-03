import React, { useEffect, useState } from "react";

import { Select } from "ui/Form";

const LogType = ({ type, types, change, editing, data }) => {
	const [color, setColor] = useState("");

	useEffect(() => {
		if (types && types.length && type)
			setColor(types.find((t) => t.id === type).color);
		else setColor("");
	}, [type, types]);

	return (
		<div className="DailyTracking__FieldContainer">
			{editing ? (
				<Select
					name="log_type"
					onChange={change}
					value={type}
					placeholder="Type"
					options={types}
					withLabel={false}
					styles={type ? "HasValue" : ""}
					style={{ backgroundColor: color }}
					noDefaultOption
				/>
			) : (
				data && (
					<div
						className="Select__ToggleBtn"
						style={{ backgroundColor: data.color || null }}
					>
						{data.name}
					</div>
				)
			)}
		</div>
	);
};

export default LogType;
