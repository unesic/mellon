import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { HiCheckCircle } from "react-icons/hi";
import useVisible from "lib/hooks/useVisible";

export const FContainer = React.memo(({ formType = "", children }) => {
	return (
		<div className="Form__Container">
			<div className="Form__ContainerInner">
				{children}
				{formType === "register" ? (
					<p className="Form__AdditionalText">
						Already have an account?{" "}
						<NavLink
							to="/login"
							className="Form__AdditionalTextLink"
						>
							Log In
						</NavLink>
					</p>
				) : formType === "login" ? (
					<p className="Form__AdditionalText">
						Don't have an account?{" "}
						<NavLink
							to="/register"
							className="Form__AdditionalTextLink"
						>
							Register
						</NavLink>
					</p>
				) : null}
			</div>
		</div>
	);
});

export const FormTitle = React.memo(({ children }) => {
	return <h2 className="Form__Title">{children}</h2>;
});

export const Form = React.memo(
	({ generalError = false, onSubmit, children }) => {
		return (
			<form
				className={
					generalError ? "Form__FormGeneralError" : "Form__Form"
				}
				onSubmit={onSubmit}
			>
				{children}
			</form>
		);
	}
);

export const FieldsetGroup = React.memo(({ children }) => {
	return <div className="Form__FieldsetGroup">{children}</div>;
});

export const Fieldset = React.memo(({ width = "", children }) => {
	return (
		<fieldset
			className={`${"Form__Fieldset"} ${width === "" ? "w-full" : width}`}
		>
			{children}
		</fieldset>
	);
});

export const Label = React.memo(
	({ htmlFor, checkbox = { type: "", value: "" }, children }) => {
		return (
			<label
				htmlFor={htmlFor}
				className={`${"Form__Label"} ${
					checkbox && "Form__CheckboxLabel"
				}`}
			>
				{checkbox.type === "checkbox" && (
					<span
						className={`${"Form__CheckboxIcon"} ${
							checkbox.value && "Form__CheckboxIconChecked"
						}`}
					>
						{checkbox.value ? (
							<ImCheckboxChecked />
						) : (
							<ImCheckboxUnchecked />
						)}
					</span>
				)}
				{children}
			</label>
		);
	}
);

export const Error = React.memo(({ general = false, children }) => {
	return (
		<small className={general ? "Form__ErrorMsgGeneral" : "Form__ErrorMsg"}>
			{children}
		</small>
	);
});

export const Input = React.memo(
	({
		type,
		name,
		onChange,
		value,
		placeholder,
		label,
		withLabel = true,
		error,
		styles = null,
		style = {},
	}) => {
		return (
			<>
				{withLabel && (
					<Label htmlFor={name} checkbox={{ type, value }}>
						{label}
					</Label>
				)}
				<input
					type={type}
					id={name}
					name={name}
					className={`${"Form__Input"} ${
						error ? "Form__InputHasErrors" : ""
					} ${styles ? styles : ""}`.trim()}
					onChange={onChange}
					value={value}
					placeholder={placeholder}
					style={{ display: type === "checkbox" && "none", ...style }}
				/>
				{error && <Error>{error}</Error>}
			</>
		);
	}
);

export const Select = React.memo(
	({
		name,
		onChange,
		value,
		placeholder,
		options,
		label,
		withLabel = true,
		error,
		styles = null,
		style = {},
		noDefaultOption = false,
	}) => {
		const [selected, setSelected] = useState(null);
		const [selectName, setSelectName] = useState(null);
		const { ref, isVisible, setIsVisible } = useVisible(false);

		useEffect(() => {
			setSelected(value || placeholder);
			const o = options.find((o) => o.id === (value || placeholder));
			setSelectName(o ? o.name : null);
		}, [value]);

		const onClickHandler = (e) => {
			const { target: child } = e;
			const { parentNode: parent } = child;
			const { value: cValue, name: cName } = child.dataset;
			const { value: pValue, name: pName } = parent.dataset;

			setSelected(cValue || pValue || "");
			setSelectName(cName || pName || "");
			onChange({ target: { name, value: cValue || pValue || "" } });
			setIsVisible(false);
		};

		return (
			<>
				{withLabel && <Label htmlFor={name}>{label}</Label>}
				<div className="Select__Wrapper" ref={ref}>
					<button
						type="button"
						className={`Select__ToggleBtn WithTransition ${
							value === "" ? "Form__SelectPlaceholder" : ""
						} ${styles ? styles : ""}`.trim()}
						style={{ ...style }}
						onClick={() => setIsVisible(!isVisible)}
					>
						{selectName || placeholder}
					</button>
					{isVisible ? (
						<div className="Select__DropdownContainer">
							<div className="Select__DropdownInner">
								<div className="Select__DropdownItems">
									{!noDefaultOption ? (
										<div className="Select__DropdownItem">
											<button
												type="button"
												className="Select__DropdownItemInner WithTransition"
												data-value=""
												data-name=""
												onClick={onClickHandler}
											>
												{placeholder || "Select one..."}
											</button>
										</div>
									) : null}

									{options.map(({ id, name }) => {
										const isSelected = selected === id;

										return (
											<div
												className="Select__DropdownItem"
												key={id}
											>
												<button
													className={`Select__DropdownItemInner WithTransition ${
														isSelected
															? "Selected"
															: ""
													}`.trim()}
													data-value={id}
													data-name={name}
													onClick={onClickHandler}
												>
													<span>{name}</span>
													{isSelected ? (
														<HiCheckCircle />
													) : null}
												</button>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					) : null}
				</div>
				{error && <Error>{error}</Error>}
			</>
		);
	}
);

export const Submit = React.memo(
	({ type = "submit", submitable = true, styles = null, children }) => {
		return (
			<button
				type={type}
				className={`${
					submitable ? "Form__Button" : "Form__ButtonDisabled"
				} ${styles ? styles : ""}`.trim()}
				disabled={!submitable}
			>
				{children}
			</button>
		);
	}
);

export const AdditionalText = React.memo(({ children }) => {
	return <p className="Form__AdditionalText">{children}</p>;
});
