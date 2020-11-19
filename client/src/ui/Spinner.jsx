import React from "react";
import { SyncLoader } from "react-spinners";

const Spinner = () => {
	return (
		<div className={"text-center mt-16"}>
			<SyncLoader color={"#4fd1c5"} />
		</div>
	);
};

export default Spinner;
