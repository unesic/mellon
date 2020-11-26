import React from "react";
import moment from "moment";

const LogCreatedAt = ({ editing, timestamp }) => {
	return !editing ? (
		<div className="DailyTracking__CreatedAt">
			{moment(new Date(parseInt(timestamp)).toISOString()).format(
				"HH[:]mm"
			)}
		</div>
	) : null;
};

export default LogCreatedAt;
