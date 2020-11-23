import React from "react";

import Calendar from "components/Calendar";
import NewEntry from "components/NewEntry";
import Entries from "components/Entries";

const Homepage = () => {
	return (
		<div>
			<Calendar />
			<NewEntry />
			<Entries />
		</div>
	);
};

export default Homepage;
