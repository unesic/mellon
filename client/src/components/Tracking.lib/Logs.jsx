import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import { DELETE_LOG, GET_LOGS_BY_IDS } from "lib/graphql/log.queries";
import Log from "./Log";

import { TrackingContext } from "lib/TrackingContext";

const Logs = () => {
	const {
		state: { dayData },
		dispatch,
	} = useContext(TrackingContext);
	const [logs, setLogs] = useState([]);

	const [getLogsByIds] = useLazyQuery(GET_LOGS_BY_IDS, {
		fetchPolicy: "no-cache",
		onCompleted({ getLogsByIds }) {
			const reversed = getLogsByIds.reverse();
			setLogs(reversed);
		},
		onError(err) {
			console.log(JSON.stringify(err, null, 2));
		},
	});

	const [deleteLog] = useMutation(DELETE_LOG, {
		onCompleted({ deleteLog }) {
			console.log(deleteLog);
		},
		onError(err) {
			console.error(JSON.stringify(err, null, 2));
		},
	});

	useEffect(() => {
		if (dayData.logs) {
			getLogsByIds({
				variables: { ids: dayData.logs },
			});
		} else {
			setLogs([]);
		}
	}, [dayData]);

	const onDelete = (logId) => {
		deleteLog({
			variables: { logId },
		});

		const newDayData = { ...dayData };
		const newDayDataLogs = newDayData.logs.filter((l) => l.id !== logId);
		dispatch({
			type: "SET_DAY",
			payload: { ...dayData, logs: [...newDayDataLogs] },
		});
	};

	return (
		<div className="DailyTracking__Entries">
			<h1 className="DailyTracking__Title">All entries</h1>
			{logs.map((log) => (
				<Log key={log.id} log={log} onDelete={onDelete} />
			))}
		</div>
	);
};

export default Logs;
