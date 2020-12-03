import React from "react";

import { Input } from "ui/Form";

const LogAdditional = ({ change, editing, subtype, text, idx }) => {
	return (
		<div className="DailyTracking__FieldContainer">
			{!editing ? (
				<div className="DailyTracking__TextContainer TooltipContainer">
					<div className="DailyTracking__Text">{text}</div>
					<span
						className={`DailyTracking__TextInfo TooltipText ${
							!idx ? "Bottom" : ""
						}`}
					>
						{text}
					</span>
				</div>
			) : subtype ? (
				<Input
					type="text"
					name="log_additional"
					onChange={change}
					value={text}
					placeholder="Text"
					withLabel={false}
					styles={`DailyTracking__TextInput WithTransition ${
						text ? "HasValue" : ""
					}`}
				/>
			) : null}
		</div>
	);
};

export default LogAdditional;
