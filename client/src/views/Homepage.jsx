import React, { useState } from "react";

import Calendar from "components/Calendar";
import Tracking from "components/Tracking";

import { TrackingProvider } from "lib/TrackingContext";

const Homepage = () => {
	const [date, setDate] = useState(new Date());
	return (
		<div className="flex flex-wrap">
			<Calendar date={date} setDate={setDate} />
			<TrackingProvider>
				<Tracking currentDay={date} />
			</TrackingProvider>
		</div>
	);
};

export default Homepage;
