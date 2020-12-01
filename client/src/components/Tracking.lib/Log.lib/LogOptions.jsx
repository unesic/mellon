import React from "react";
import { MdDelete, MdEdit, MdSave, MdCancel } from "react-icons/md";

const LogOptions = ({ editing, onChange, onCancel, onSave, onDelete }) => {
	return (
		<div
			className={`DailyTracking__LogOptionsWrapper WithTransition${
				editing ? " Editing" : ""
			}`}
		>
			{!editing ? (
				<button
					className="DailyTracking__LogOption WithTransition Edit"
					onClick={onChange}
				>
					<MdEdit />
				</button>
			) : (
				<>
					<button
						className="DailyTracking__LogOption WithTransition Cancel"
						onClick={onCancel}
					>
						<MdCancel />
					</button>
					<button
						className="DailyTracking__LogOption WithTransition Save"
						onClick={onSave}
					>
						<MdSave />
					</button>
					<button
						className="DailyTracking__LogOption WithTransition Remove"
						onClick={onDelete}
					>
						<MdDelete />
					</button>
				</>
			)}
		</div>
	);
};

export default LogOptions;
