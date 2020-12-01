import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";

import useVisible from "lib/hooks/useVisible";
import { Input } from "ui/Form";
import ColorPicker from "./ColorPicker";

const NameColor = ({
	label,
	onSubmit,
	visible = false,
	name = "",
	color = "",
}) => {
	const [state, setState] = useState({ name: name, color: color });
	const { ref, isVisible, setIsVisible } = useVisible(visible);

	useEffect(() => {
		if (!isVisible) {
			setState({ name: "", color: "" });
		}
	}, [isVisible]);

	const onNameChangeHandler = (e) => {
		setState({ ...state, name: e.target.value });
	};

	const onColorChangeHandler = (color) => {
		setState({ ...state, color: color });
	};

	const submitHandler = () => {
		onSubmit(state);
		setIsVisible(false);
	};

	return (
		<>
			{!isVisible ? (
				<button
					className="PillButton TextWithIcon"
					onClick={() => setIsVisible(true)}
				>
					<MdAddCircle /> {label}
				</button>
			) : (
				<div ref={ref} className="flex items-center">
					<div className="DailyTracking__FieldContainer">
						<Input
							type="text"
							name="type_name"
							onChange={onNameChangeHandler}
							value={state.name}
							placeholder="Name"
							withLabel={false}
							styles={`DailyTracking__TextInput WithTransition ExtraWide ${
								state.name ? "HasValue" : ""
							}`}
						/>
					</div>
					{state.name ? (
						<>
							<div className="DailyTracking__FieldContainer">
								<ColorPicker
									name="type_color"
									value={state.color}
									onChange={onColorChangeHandler}
								/>
							</div>
							{state.color ? (
								<button
									onClick={submitHandler}
									className="PillButton TextWithIcon"
								>
									<MdAddCircle />
									{label}
								</button>
							) : null}
						</>
					) : null}
				</div>
			)}
		</>
	);
};

export default NameColor;
