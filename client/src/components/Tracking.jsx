import React, { useContext } from "react";
import moment from "moment";

import { TrackingContext } from "lib/TrackingContext";

import NewLog from "./Tracking.lib/NewLog";
import Logs from "./Tracking.lib/Logs";

const Tracking = React.memo(() => {
	const { currentDay } = useContext(TrackingContext);

	return (
		<div className="DailyTracking__Wrapper">
			<div className="DailyTracking__Container">
				<h2 className="Title__Main">
					{moment(currentDay).format("dddd, MMMM Do")}
				</h2>

				<NewLog />
				<Logs />
			</div>
		</div>
	);
});

export default Tracking;
