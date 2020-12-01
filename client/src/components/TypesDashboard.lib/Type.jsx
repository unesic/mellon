import React, { useContext } from "react";
import { useMutation } from "@apollo/client";

import useVisible from "lib/hooks/useVisible";
import { CREATE_LOG_SUB_TYPE } from "lib/graphql/logSubType.queries";
import { TrackingContext } from "lib/TrackingContext";
import TypeButton from "./Types.lib/TypeButton";
import Subtypes from "./Subtypes";
import NameColor from "./NameColor";

const Type = ({ id, name, color, enabled, subtypes }) => {
	const { getUserLogTypes } = useContext(TrackingContext);

	const {
		ref: editingRef,
		isVisible: isEditing,
		setIsVisible: setIsEditing,
	} = useVisible(false);

	const [createLogSubType] = useMutation(CREATE_LOG_SUB_TYPE, {
		onCompleted({ createLogSubType }) {
			getUserLogTypes();
		},
		onError(err) {
			console.error(err);
		},
	});

	const onSubmitHandler = ({ name, color }) => {
		createLogSubType({
			variables: { typeId: id, name: name, color: color },
		});
	};

	return (
		<div className="UserTypes__TypeContainer">
			<div className="UserTypes__TypeInner" ref={editingRef}>
				<TypeButton
					typeId={id}
					name={name}
					color={color}
					enabled={enabled}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
				{enabled && !isEditing && (
					<NameColor label="Subtype" onSubmit={onSubmitHandler} />
				)}
			</div>
			<Subtypes subtypes={subtypes} parentEnabled={enabled} />
		</div>
	);
};

export default Type;
