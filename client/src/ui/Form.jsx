import React from "react";
import { NavLink } from "react-router-dom";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

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
					}`}
					onChange={onChange}
					value={value}
					placeholder={placeholder}
					style={{ display: type === "checkbox" && "none" }}
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
	}) => {
		return (
			<>
				{withLabel && <Label htmlFor={name}>{label}</Label>}
				<select
					name={name}
					id={name}
					value={value || placeholder}
					onChange={onChange}
					className={`${"Form__Input"} ${
						value === "" ? "Form__SelectPlaceholder" : null
					}`}
				>
					<option value="">Select one...</option>
					{options.map((o) => (
						<option value={o.value} key={o.value}>
							{o.label}
						</option>
					))}
				</select>
				{error && <Error>{error}</Error>}
			</>
		);
	}
);

export const Submit = React.memo(({ submitable = true, children }) => {
	return (
		<button
			type="submit"
			className={submitable ? "Form__Button" : "Form__ButtonDisabled"}
			disabled={!submitable}
		>
			{children}
		</button>
	);
});

export const AdditionalText = React.memo(({ children }) => {
	return <p className="Form__AdditionalText">{children}</p>;
});
