import React, { useContext, useRef, useState } from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_LOG } from "lib/graphql/log.queries";
import { TrackingContext } from "lib/TrackingContext";
import LogType from "./Log.lib/LogType";
import LogSubType from "./Log.lib/LogSubType";
import LogOptions from "./Log.lib/LogOptions";
import LogAdditional from "./Log.lib/LogAdditional";
import LogCreatedAt from "./Log.lib/LogCreatedAt";
import LogTime from "./Log.lib/LogTime";

const Log = React.memo(
	({
		log: { id, typeId, subtypeId, additional, timestamp, createdAt },
		onDelete,
	}) => {
		const {
			state: { logTypes, logSubTypes },
		} = useContext(TrackingContext);
		const [editing, setEditing] = useState(false);
		const [log, setLog] = useState({
			id,
			typeId,
			subtypeId,
			additional,
			timestamp,
		});
		const prevRef = useRef({});
		const { name: typeName, color: typeColor } = logTypes.find(
			(t) => t.id === typeId
		);
		const { name: subtypeName, color: subtypeColor } = logSubTypes.find(
			(t) => t.id === subtypeId
		);

		const [updateLog] = useMutation(UPDATE_LOG, {
			onCompleted({ updateLog }) {
				console.log(updateLog);
			},
			onError(err) {
				console.error(JSON.stringify(err, null, 2));
			},
		});

		const changeMode = () => {
			if (!editing) {
				setEditing(true);
				prevRef.current = { ...log };
			} else {
				setEditing(false);
			}
		};

		const onLogTypeChange = (e) => {
			const newType = logTypes.find((t) => t.id === e.target.value);
			if (newType) {
				setLog({
					...log,
					typeId: newType.id,
				});
			}
		};

		const onLogSubTypeChange = (e) => {
			const newSubType = logSubTypes.find((t) => t.id === e.target.value);
			if (newSubType) {
				setLog({
					...log,
					subtypeId: newSubType.id,
				});
			}
		};

		const onLogAdditionalChange = (e) => {
			setLog({
				...log,
				additional: e.target.value,
			});
		};

		const onLogTimeChange = (newTimestamp) => {
			setLog({
				...log,
				timestamp: newTimestamp,
			});
		};

		const saveChanges = () => {
			// TODO: Make an API call to db to update log
			updateLog({
				variables: { ...log },
			});
			setEditing(false);
		};

		const cancel = () => {
			setLog({ ...prevRef.current });
			prevRef.current = {};
			setEditing(false);
		};

		return (
			<div className="DailyTracking__Log">
				<LogCreatedAt editing={editing} timestamp={createdAt} />
				<LogType
					currType={log.typeId}
					logTypes={logTypes}
					onChange={onLogTypeChange}
					editing={editing}
					data={{ name: typeName, color: typeColor }}
				/>
				<LogSubType
					currType={log.typeId}
					currSubType={log.subtypeId}
					logSubTypes={logSubTypes}
					onChange={onLogSubTypeChange}
					editing={editing}
					data={{ name: subtypeName, color: subtypeColor }}
				/>
				<LogAdditional
					onChange={onLogAdditionalChange}
					editing={editing}
					currSubType={log.subtypeId}
					additionalText={log.additional}
				/>
				<LogTime
					currSubType={log.subtypeId}
					logTime={log.timestamp}
					onChange={onLogTimeChange}
					editing={editing}
					timestamp={log.timestamp}
				/>
				<LogOptions
					editing={editing}
					onChange={changeMode}
					onCancel={cancel}
					onSave={saveChanges}
					onDelete={() => onDelete(id)}
				/>
			</div>
		);
	}
);

export default Log;
