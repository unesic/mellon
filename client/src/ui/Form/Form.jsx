import React from "react";
import { NavLink } from "react-router-dom";

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

export const Form = ({ onSubmit, children }) => {
	return (
		<form className={fc.Form} onSubmit={onSubmit}>
			{children}
		</form>
	);
};

export const Fieldset = ({ children }) => {
	return <fieldset className={fc.Fieldset}>{children}</fieldset>;
};

export const Label = ({ htmlFor, children }) => {
	return (
		<label htmlFor={htmlFor} className={fc.Label}>
			{children}
		</label>
	);
};

export const Error = ({ children }) => {
	return <small className={fc.ErrorMsg}>{children}</small>;
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
			{withLabel && <Label htmlFor={name}>{label}</Label>}
			<input
				type={type}
				id={name}
				name={name}
				className={`${fc.Input} ${error ? fc.InputHasErrors : ""}`}
				onChange={onChange}
				value={value}
				placeholder={placeholder}
			/>
			{error && <Error>{error}</Error>}
		</>
	);
};

export const Submit = ({ children }) => {
	return (
		<button type="submit" className={fc.Button}>
			{children}
		</button>
	);
};

export const AdditionalText = ({ children }) => {
	return <p className={fc.AdditionalText}>{children}</p>;
};

export const FormTitle = ({ children }) => {
	return <h2 className={fc.Title}>{children}</h2>;
};
