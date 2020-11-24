import React from "react";

import NewEntry from "components/NewEntry";
// import Entries from "components/Entries";

const Tracking = ({ currentDay }) => {

	return (
		<NewEntry date={currentDay} />
	);
};

export default Tracking;
