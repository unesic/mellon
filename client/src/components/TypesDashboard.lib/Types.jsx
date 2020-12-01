import React, { useContext } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_LOG_TYPE } from "lib/graphql/logType.queries";
import { TrackingContext } from "lib/TrackingContext";
import Type from "./Type";
import NameColor from "./NameColor";

const Types = () => {
	const {
		state: { logTypes },
		getUserLogTypes,
	} = useContext(TrackingContext);

	const [createLogType] = useMutation(CREATE_LOG_TYPE, {
		onCompleted({ createLogType }) {
			getUserLogTypes();
		},
		onError(err) {
			console.error(err);
		},
	});

	const onSubmitHandler = ({ name, color }) => {
		createLogType({
			variables: { name, color },
		});
	};

	return (
		<div className="UserTypes__TypesContainer">
			{logTypes.map((lt) => (
				<Type key={lt.id} {...lt} />
			))}
			<NameColor label="Type" onSubmit={onSubmitHandler} />
		</div>
	);
};

export default Types;
