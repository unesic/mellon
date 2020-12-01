import React, { useContext, useEffect, useRef, useState } from "react";
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
		idx,
		log: { id, typeId, subtypeId, additional, timestamp, createdAt },
		onDelete,
	}) => {
		const {
			state: { logTypes, logSubTypes },
		} = useContext(TrackingContext);
		const [editing, setEditing] = useState(false);
		const [logState, setLogState] = useState({
			id,
			typeId,
			subtypeId,
			additional,
			timestamp,
		});
		const prevRef = useRef({});
		const [typeData, setTypeData] = useState({
			type: logTypes.find((t) => t.id === typeId),
			subtype: logSubTypes.find((t) => t.id === subtypeId),
		});

		useEffect(() => {
			setTypeData({
				type: logTypes.find((t) => t.id === typeId),
				subtype: logSubTypes.find((t) => t.id === subtypeId),
			});
		}, [logTypes, logSubTypes]);

		const [updateLog] = useMutation(UPDATE_LOG, {
			onCompleted({ updateLog: { typeId, subtypeId } }) {
				setTypeData({
					type: logTypes.find((t) => t.id === typeId),
					subtype: logSubTypes.find((t) => t.id === subtypeId),
				});
			},
			onError(err) {
				console.error(JSON.stringify(err, null, 2));
			},
		});

		const changeMode = () => {
			if (!editing) {
				setEditing(true);
				prevRef.current = { ...logState };
			} else {
				setEditing(false);
			}
		};

		const onLogTypeChange = (e) => {
			const newType = logTypes.find((t) => t.id === e.target.value);
			if (newType) {
				setLogState({
					...logState,
					typeId: newType.id,
					subtypeId: null,
				});
			}
		};

		const onLogSubTypeChange = (e) => {
			const newSubType = logSubTypes.find((t) => t.id === e.target.value);
			if (newSubType) {
				setLogState({
					...logState,
					subtypeId: newSubType.id,
				});
			}
		};

		const onLogAdditionalChange = (e) => {
			setLogState({
				...logState,
				additional: e.target.value,
			});
		};

		const onLogTimeChange = (newTimestamp) => {
			setLogState({
				...logState,
				timestamp: newTimestamp,
			});
		};

		const saveChanges = () => {
			updateLog({
				variables: { ...logState },
			});
			setEditing(false);
		};

		const cancel = () => {
			setLogState({ ...prevRef.current });
			prevRef.current = {};
			setEditing(false);
		};

		return (
			<div className="DailyTracking__Log">
				<LogCreatedAt
					editing={editing}
					timestamp={createdAt}
					idx={idx}
				/>
				<LogType
					currType={logState.typeId}
					logTypes={logTypes}
					onChange={onLogTypeChange}
					editing={editing}
					data={{
						name: typeData.type.name,
						color: typeData.type.color,
					}}
				/>
				<LogSubType
					currType={logState.typeId}
					currSubType={logState.subtypeId}
					logSubTypes={logSubTypes}
					onChange={onLogSubTypeChange}
					editing={editing}
					data={{
						name: typeData.subtype.name,
						color: typeData.subtype.color,
					}}
				/>
				<LogAdditional
					onChange={onLogAdditionalChange}
					editing={editing}
					currSubType={logState.subtypeId}
					additionalText={logState.additional}
					idx={idx}
				/>
				<LogTime
					currSubType={logState.subtypeId}
					logTime={logState.timestamp}
					onChange={onLogTimeChange}
					editing={editing}
					timestamp={logState.timestamp}
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
