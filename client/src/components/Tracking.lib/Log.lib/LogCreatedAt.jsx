import React, { useRef } from "react";
import moment from "moment";

const LogCreatedAt = React.memo(({ editing, timestamp, idx }) => {
	const short = useRef(
		moment(new Date(parseInt(timestamp)).toISOString()).format("HH[:]mm")
	);

	const long = useRef(
		moment(new Date(parseInt(timestamp)).toISOString()).format(
			"MMM Do[,] YYYY [at] HH[:]mm"
		)
	);

	return !editing ? (
		<div className="DailyTracking__CreatedAt TooltipContainer">
			<div className="DailyTracking__CreatedAtShort">{short.current}</div>
			<span
				className={`DailyTracking__CreatedAtLong TooltipText ${
					!idx ? "Bottom" : ""
				}`}
			>
				{long.current}
			</span>
		</div>
	) : null;
});

export default LogCreatedAt;
