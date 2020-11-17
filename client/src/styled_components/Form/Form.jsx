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

export const Input = ({
	type,
	name,
	onChange,
	value,
	label,
	withLabel = true,
	errors,
}) => {
	return (
		<>
			{withLabel ? (
				<label htmlFor={name} className={fc.Label}>
					{label}
				</label>
			) : null}
			<input
				type={type}
				id={name}
				name={name}
				className={`${fc.Input} ${errors ? fc.InputHasErrors : ""}`}
				onChange={onChange}
				value={value}
			/>
			{errors ? <small className={fc.ErrorMsg}>{errors}</small> : null}
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
