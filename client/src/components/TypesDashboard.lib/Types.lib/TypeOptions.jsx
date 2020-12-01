import React from "react";

import { MdEdit, MdRemoveCircle, MdRemoveCircleOutline } from "react-icons/md";

const TypeOptions = ({ enabled, parentEnabled, onEdit, toggleEnable }) => {
	return !parentEnabled ? (
		<div className="TooltipText Bottom">
			In order to use or edit this subtype you have to enable parent type
			first!
		</div>
	) : (
		<div className="UserTypes__TypeOptionsContainer">
			<button
				className="UserTypes__TypeOption WithTransition"
				onClick={onEdit}
			>
				<MdEdit /> Edit
			</button>
			<button
				className="UserTypes__TypeOption WithTransition"
				onClick={toggleEnable}
			>
				{enabled ? (
					<>
						<MdRemoveCircle /> Disable
					</>
				) : (
					<>
						<MdRemoveCircleOutline /> Enable
					</>
				)}
			</button>
		</div>
	);
};

export default TypeOptions;
