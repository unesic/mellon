import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import moment from "moment";
import { MdAddCircle } from "react-icons/md";

import { TrackingContext } from "lib/TrackingContext";
import { CREATE_DAY } from "lib/graphql/day.queries";
import { CREATE_LOG } from "lib/graphql/log.queries";

const LogCreate = ({ date }) => {
	const {
		state: { currType, currSubType, logTime, dayData, additionalText },
		dispatch,
	} = useContext(TrackingContext);

	const getVariables = () => {
		const variables = {
			dayId: dayData.id,
			typeId: currType,
			subtypeId: currSubType,
			additional: additionalText,
		};

		if (moment(logTime).isValid()) {
			variables.timestamp = logTime;
		} else if (logTime === "current") {
			variables.timestamp = moment(new Date()).toISOString();
		} else {
			const [num, unit] = logTime.split("-");

			variables.timestamp = moment(new Date())
				.subtract(parseInt(num), unit)
				.toISOString();
		}

		return variables;
	};

	const [createLog] = useMutation(CREATE_LOG, {
		onCompleted({ createLog }) {
			dispatch({
				type: "ADD_LOG",
				payload: createLog.id,
			});
		},
		onError(err) {
			console.log(JSON.stringify(err, null, 2));
		},
	});

	const [createDay] = useMutation(CREATE_DAY, {
		variables: { date: moment(date).format("DD[/]MM[/]YYYY") },
		onCompleted({ createDay }) {
			dispatch({
				type: "SET_DAY",
				payload: createDay,
			});

			const variables = getVariables();
			createLog({ variables });
		},
		onError(err) {
			console.log(JSON.stringify(err, null, 2));
		},
	});

	const addNewLog = () => {
		if (dayData.id) {
			const variables = getVariables();
			createLog({ variables });
		} else {
			createDay();
		}
	};

	return (
		currType &&
		currSubType &&
		logTime && (
			<button className="DailyTracking__Button" onClick={addNewLog}>
				<MdAddCircle />
			</button>
		)
	);
};

export default LogCreate;
