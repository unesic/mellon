import React, { useEffect, useState } from "react";

import { Select } from "ui/Form";

const LogSubType = ({ logSubTypes, currSubType, onChange }) => {
	const [subTypes, setSubTypes] = useState([]);

	useEffect(() => {
		setSubTypes(logSubTypes);
	}, [logSubTypes]);

	return (
		<Select
			name="log_time"
			onChange={onChange}
			value={currSubType}
			placeholder="Sub-type"
			options={subTypes}
			withLabel={false}
			styles={`DailyTracker__SelectInput ${
				currSubType ? "HasValue" : ""
			}`}
		/>
	);
};

export default LogSubType;
