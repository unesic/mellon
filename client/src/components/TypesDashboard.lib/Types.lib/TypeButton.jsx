import React, { useContext } from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_LOG_TYPE } from "lib/graphql/logType.queries";
import { UPDATE_LOG_SUBTYPE } from "lib/graphql/logSubType.queries";
import useVisible from "lib/hooks/useVisible";
import { TrackingContext } from "lib/TrackingContext";

import TypeOptions from "./TypeOptions";
import NameColor from "../NameColor";

const TypeButton = ({
	typeId,
	subtypeId,
	name,
	color,
	enabled,
	parentEnabled = true,
	isEditing,
	setIsEditing,
}) => {
	const { getUserLogTypes } = useContext(TrackingContext);

	const {
		ref: optionsRef,
		isVisible: optionsVisible,
		setIsVisible: setOptionsVisible,
	} = useVisible(false);

	const [updateLogType] = useMutation(UPDATE_LOG_TYPE, {
		onCompleted({ updateLogType }) {
			getUserLogTypes();
		},
		onError(err) {
			console.error(err);
		},
	});

	const [updateLogSubType] = useMutation(UPDATE_LOG_SUBTYPE, {
		onCompleted({ updateLogSubType }) {
			getUserLogTypes();
		},
		onError(err) {
			console.error(err);
		},
	});

	const onEditHandler = () => {
		setIsEditing(true);
		setOptionsVisible(false);
	};

	const toggleEnableHandler = () => {
		setOptionsVisible(false);
		if (typeId) {
			updateLogType({
				variables: { id: typeId, name, color, enabled: !enabled },
			});
		} else if (subtypeId) {
			updateLogSubType({
				variables: { id: subtypeId, name, color, enabled: !enabled },
			});
		}
	};

	const onSaveHandler = ({ name, color }) => {
		setIsEditing(false);
		if (typeId) {
			updateLogType({
				variables: { id: typeId, name: name, color: color, enabled },
			});
		} else if (subtypeId) {
			updateLogSubType({
				variables: { id: subtypeId, name: name, color: color, enabled },
			});
		}
	};

	return (
		<div
			ref={optionsRef}
			className="UserTypes__MainContainer TooltipContainer"
		>
			{isEditing ? (
				<NameColor
					label="Save"
					onSubmit={onSaveHandler}
					visible
					name={name}
					color={color}
				/>
			) : (
				<button
					onClick={() => setOptionsVisible(!optionsVisible)}
					className={`UserTypes__TypeButton ${
						!enabled || !parentEnabled ? "Disabled" : ""
					}`}
					style={{ backgroundColor: color }}
				>
					{name}
				</button>
			)}
			{optionsVisible && (
				<TypeOptions
					enabled={enabled}
					parentEnabled={parentEnabled}
					onEdit={onEditHandler}
					toggleEnable={toggleEnableHandler}
				/>
			)}
		</div>
	);
};

export default TypeButton;
