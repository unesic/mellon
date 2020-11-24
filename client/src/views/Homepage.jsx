import React, { useState } from "react";

import Calendar from "components/Calendar";
import Tracking from "components/Tracking";

const Homepage = () => {
	const [date, setDate] = useState(new Date());
	return (
		<div className="flex flex-wrap">
			<Calendar date={date} setDate={setDate} />
			<Tracking currentDay={date} />
		</div>
	);
};

export default Homepage;
