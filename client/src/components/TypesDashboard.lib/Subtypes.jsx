import React, { useContext } from "react";

import { TrackingContext } from "lib/TrackingContext";
import Subtype from "./Subtype";

const Subtypes = ({ subtypes, parentEnabled }) => {
	const {
		state: { logSubTypes },
	} = useContext(TrackingContext);

	return subtypes.length ? (
		<div className="UserTypes__SubTypesContainer">
			{subtypes.map((subtypeId) => (
				<Subtype
					key={subtypeId}
					{...logSubTypes.find((subtype) => subtype.id === subtypeId)}
					parentEnabled={parentEnabled}
				/>
			))}
		</div>
	) : null;
};

export default Subtypes;
