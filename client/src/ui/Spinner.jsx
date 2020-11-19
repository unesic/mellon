import React from "react";
import { SyncLoader } from "react-spinners";

const Spinner = () => {
	return (
		<div className="text-center py-6">
			<SyncLoader color={"#4fd1c5"} />
		</div>
	);
};

export default Spinner;
