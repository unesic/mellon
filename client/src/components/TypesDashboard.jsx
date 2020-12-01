import React from "react";

import Types from "./TypesDashboard.lib/Types";

const TypesDashboard = () => {
	return (
		<div className="UserTypes__Wrapper">
			<div className="UserTypes__Container">
				<h2 className="Title__Main">Types and subtypes</h2>
				<Types />
			</div>
		</div>
	);
};

export default TypesDashboard;
