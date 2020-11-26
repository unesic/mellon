import React, { useContext } from "react";

import { TrackingContext } from "lib/TrackingContext";
import { Input } from "ui/Form";

const LogAdditional = ({
	parent = "entry",
	onChange,
	editing = true,
	currSubType = null,
	additionalText = "",
}) => {
	const { state } = useContext(TrackingContext);

	return !editing ? (
		<div className="DailyTracking__AdditionalTextContainer">
			<div className="DailyTracking__AdditionalText">
				{additionalText}
			</div>
			<span className="DailyTracking__AdditionalTextInfo">
				{additionalText}
			</span>
		</div>
	) : parent === "new" && state.currSubType ? (
		<Input
			type="text"
			name="log_additional"
			onChange={onChange}
			value={state.additionalText}
			placeholder="Text"
			withLabel={false}
			styles={`DailyTracking__TextInput ${
				state.additionalText ? "HasValue" : ""
			}`}
		/>
	) : currSubType ? (
		<Input
			type="text"
			name="log_additional"
			onChange={onChange}
			value={additionalText}
			placeholder="Text"
			withLabel={false}
			styles={`DailyTracking__TextInput ${
				additionalText ? "HasValue" : ""
			}`}
		/>
	) : null;
};

export default LogAdditional;
