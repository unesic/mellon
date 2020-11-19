import React from "react";
import { NavLink } from "react-router-dom";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

import fc from "./Form.classes";

export const FContainer = ({ formType = "", children }) => {
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
};

export const FormTitle = ({ children }) => {
	return <h2 className={fc.Title}>{children}</h2>;
};

export const Form = ({ generalError = false, onSubmit, children }) => {
	return (
		<form
			className={generalError ? fc.FormGeneralError : fc.Form}
			onSubmit={onSubmit}
		>
			{children}
		</form>
	);
};

export const Fieldset = ({ children }) => {
	return <fieldset className={fc.Fieldset}>{children}</fieldset>;
};

export const Label = ({
	htmlFor,
	checkbox = { type: "", value: "" },
	children,
}) => {
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
};

export const Error = ({ general = false, children }) => {
	return (
		<small className={general ? fc.ErrorMsgGeneral : fc.ErrorMsg}>
			{children}
		</small>
	);
};

export const Input = ({
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
};

export const Submit = ({ submitable = true, children }) => {
	return (
		<button
			type="submit"
			className={submitable ? fc.Button : fc.ButtonDisabled}
			disabled={!submitable}
		>
			{children}
		</button>
	);
};

export const AdditionalText = ({ children }) => {
	return <p className={fc.AdditionalText}>{children}</p>;
};
