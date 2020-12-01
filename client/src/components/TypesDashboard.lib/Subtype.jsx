import React from "react";

import useVisible from "lib/hooks/useVisible";
import TypeButton from "./Types.lib/TypeButton";

const Subtype = ({ id, name, color, enabled, parentEnabled }) => {
	const {
		ref: editingRef,
		isVisible: isEditing,
		setIsVisible: setIsEditing,
	} = useVisible(false);

	return (
		<div className="UserTypes__TypeInner" ref={editingRef}>
			<TypeButton
				subtypeId={id}
				name={name}
				color={color}
				enabled={enabled}
				parentEnabled={parentEnabled}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
			/>
		</div>
	);
};

export default Subtype;
