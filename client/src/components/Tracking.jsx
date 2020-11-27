import React, { useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import moment from "moment";

import { GET_LOG_TYPES } from "lib/graphql/logType.queries";
import { GET_LOG_SUBTYPES_FROM_IDS } from "lib/graphql/logSubType.queries";
import { DAY_FROM_UID_AND_DATE } from "lib/graphql/day.queries";

import { TrackingContext } from "lib/TrackingContext";

import NewLog from "./Tracking.lib/NewLog";
import Logs from "./Tracking.lib/Logs";

const Tracking = React.memo(({ currentDay }) => {
	const { dispatch } = useContext(TrackingContext);

	const [getLogSubTypesFromIds] = useLazyQuery(GET_LOG_SUBTYPES_FROM_IDS, {
		onCompleted({ getLogSubTypesFromIds }) {
			dispatch({
				type: "SET_SUB_TYPES",
				payload: getLogSubTypesFromIds,
			});
		},
		onError(err) {
			console.log(JSON.stringify(err, null, 2));
		},
	});

	const [getUserLogTypes] = useLazyQuery(GET_LOG_TYPES, {
		onCompleted({ getUserLogTypes }) {
			dispatch({
				type: "SET_TYPES",
				payload: getUserLogTypes,
			});

			const ids = [];
			getUserLogTypes.forEach((logType) => {
				logType.subtypes.forEach((subtype) => ids.push(subtype));
			});
			getLogSubTypesFromIds({
				variables: { ids: ids },
			});
		},
		onError(err) {
			console.log(JSON.stringify(err, null, 2));
		},
	});

	const [getDayFromDate] = useLazyQuery(DAY_FROM_UID_AND_DATE, {
		fetchPolicy: "no-cache",
		variables: { date: moment(currentDay).format("DD[/]MM[/]YYYY") },
		onCompleted({ getDayFromDate }) {
			dispatch({
				type: "SET_DAY",
				payload: getDayFromDate,
			});
		},
	});

	useEffect(() => {
		getUserLogTypes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch({
			type: "DAY_CHANGED",
		});
		getDayFromDate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentDay]);

	return (
		<div className="DailyTracking__Wrapper">
			<div className="DailyTracking__Container">
				<h2 className="DailyTracking__Title Main">
					{moment(currentDay).format("dddd, MMMM Do")}
				</h2>

				<NewLog date={currentDay} />
				<Logs />
			</div>
		</div>
	);
});

export default Tracking;
