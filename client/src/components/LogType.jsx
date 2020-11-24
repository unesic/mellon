import React, { useEffect, useState } from "react";

import { Select } from "ui/Form";

const LogType = ({ logTypes, currType, onChange }) => {
	const [types, setTypes] = useState([]);

	useEffect(() => {
		setTypes(logTypes);
	}, [logTypes]);

	return (
		<Select
			name="log_type"
			onChange={onChange}
			value={currType}
			placeholder="Type"
			options={types}
			withLabel={false}
			styles={`DailyTracker__SelectInput ${currType ? "HasValue" : ""}`}
		/>
	);
};

export default LogType;
