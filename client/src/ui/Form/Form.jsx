import React from "react";
import { NavLink } from "react-router-dom";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

import fc from "./Form.classes";

export const FContainer = React.memo(({ formType = "", children }) => {
	return (
		<div className={fc.Container}>
			<div className={fc.ContainerInner}>
				{children}
				{formType === "register" ? (
					<p className={fc.AdditionalText}>
						Already have an account?{" "}
						<NavLink to="/login" className={fc.AdditionalTextLink}>
							Log In
						</NavLink>
					</p>
				) : formType === "login" ? (
					<p className={fc.AdditionalText}>
						Don't have an account?{" "}
						<NavLink
							to="/register"
							className={fc.AdditionalTextLink}
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
	return <h2 className={fc.Title}>{children}</h2>;
});

export const Form = React.memo(
	({ generalError = false, onSubmit, children }) => {
		return (
			<form
				className={generalError ? fc.FormGeneralError : fc.Form}
				onSubmit={onSubmit}
			>
				{children}
			</form>
		);
	}
);

export const FieldsetGroup = React.memo(({ children }) => {
	return <div className={fc.fieldsetGroup}>{children}</div>;
});

export const Fieldset = React.memo(({ width = "", children }) => {
	return (
		<fieldset
			className={`${fc.Fieldset} ${width === "" ? "w-full" : width}`}
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
				className={`${fc.Label} ${checkbox && fc.CheckboxLabel}`}
			>
				{checkbox.type === "checkbox" && (
					<span
						className={`${fc.CheckboxIcon} ${
							checkbox.value && fc.CheckboxIconChecked
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
		<small className={general ? fc.ErrorMsgGeneral : fc.ErrorMsg}>
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
					className={`${fc.Input} ${error ? fc.InputHasErrors : ""}`}
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
					className={`${fc.Input} ${
						value === "" ? fc.SelectPlaceholder : null
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
			className={submitable ? fc.Button : fc.ButtonDisabled}
			disabled={!submitable}
		>
			{children}
		</button>
	);
});

export const AdditionalText = React.memo(({ children }) => {
	return <p className={fc.AdditionalText}>{children}</p>;
});
