import React, { useState } from "react";

import Calendar from "components/Calendar";
import Tracking from "components/Tracking";
import TypesDashboard from "../components/TypesDashboard";

import { TrackingProvider } from "lib/TrackingContext";

const Homepage = () => {
	const [date, setDate] = useState(new Date());

	return (
		<div className="Homepage">
			<TrackingProvider currentDay={date}>
				<div className="Homepage__Inner">
					<Calendar date={date} setDate={setDate} />
					<TypesDashboard />
				</div>
				<Tracking />
			</TrackingProvider>
		</div>
	);
};

export default Homepage;
