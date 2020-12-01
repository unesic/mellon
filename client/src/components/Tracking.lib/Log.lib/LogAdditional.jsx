import React, { useContext } from "react";

import { TrackingContext } from "lib/TrackingContext";
import { Input } from "ui/Form";

const LogAdditional = React.memo(
	({
		parent = "entry",
		onChange,
		editing = true,
		currSubType = null,
		additionalText = "",
		idx,
	}) => {
		const { state } = useContext(TrackingContext);

		return (state.currSubType && parent === "new") ||
			(additionalText && parent === "entry") ? (
			<div className="DailyTracking__FieldContainer">
				{!editing ? (
					<div className="DailyTracking__AdditionalTextContainer TooltipContainer">
						<div className="DailyTracking__AdditionalText">
							{additionalText}
						</div>
						<span
							className={`DailyTracking__AdditionalTextInfo TooltipText ${
								!idx ? "Bottom" : ""
							}`}
						>
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
						styles={`DailyTracking__TextInput WithTransition ${
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
						styles={`DailyTracking__TextInput WithTransition ${
							additionalText ? "HasValue" : ""
						}`}
					/>
				) : null}
			</div>
		) : null;
	}
);

export default LogAdditional;
