import React from "react";

import { Select } from "ui/Form";

const LogTime = ({ logTime, options, onChange }) => {
	return (
		<Select
			name="log_time"
			onChange={onChange}
			value={logTime}
			options={options}
			withLabel={false}
			styles={`DailyTracker__SelectInput Time ${logTime ? "HasValue" : ""}`}
		/>
	);
};

export default LogTime;
