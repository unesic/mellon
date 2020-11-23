import React, { useContext, useEffect, useReducer, useState } from "react";

import * as F from "ui/Form";
import Spinner from "ui/Spinner";
import ImageUpload from "ui/ImageUpload";
import { AuthContext } from "lib/AuthContext";
import * as lib from "./useForm.lib";

const useForm = (
	{ formFields, formType, formTitle = "", submitLabel = "" },
	onSubmit
) => {
	const context = useContext(AuthContext);
	const [formState, dispatchFormState] = useReducer(
		lib.formStateReducer,
		lib.getFormState(formFields)
	);
	const [fields, setFields] = useState(null);
	const [form, setForm] = useState(null);
	const [submitable, setSubmitable] = useState(false);
	const [image, setImage] = useState({
		id: "",
		filename: "",
		mimetype: "",
		path: "",
	});

	useEffect(() => {
		dispatchFormState({
			type: "RESET_FORM",
			payload: lib.getFormState(formFields),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(formFields)]);

	useEffect(() => {
		getForm();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fields]);

	useEffect(() => {
		getFields();
		const isSubmitable = lib.getSubmitable(formType, formState, image);
		setSubmitable(isSubmitable);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formState, image, context.loading]);

	useEffect(() => {
		if (formType !== "login") {
			dispatchFormState({
				type: "SET_FIELD_VALUE",
				payload: {
					name: "image",
					value: context.image.id,
				},
			});
			setImage({ ...context.image });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formFields, context.image]);

	const getFields = () => {
		const mostCommonTypes = ["text", "password", "number", "checkbox"];

		const fields = Object.keys(formState).map((key) => {
			const { name, width, type, label, error } = formState[key];
			const onChange = (e) => {
				lib.onChangeHandler(e, dispatchFormState);
			};

			if (mostCommonTypes.includes(type)) {
				return (
					<F.Fieldset key={name} width={width}>
						<F.Input {...formState[key]} onChange={onChange} />
					</F.Fieldset>
				);
			} else if (type === "image") {
				return (
					<F.Fieldset key={name} width={width}>
						<F.Label>{label}</F.Label>
						{context.loading ? (
							<Spinner />
						) : (
							<ImageUpload
								image={image}
								setImage={setImage}
								inputId={name}
								hasError={error}
							/>
						)}
						{error && <F.Error>{error}</F.Error>}
					</F.Fieldset>
				);
			} else if (type === "select") {
				return (
					<F.Fieldset key={name} width={width}>
						<F.Select {...formState[key]} onChange={onChange} />
					</F.Fieldset>
				);
			} else {
				return null;
			}
		});

		setFields(fields);
	};

	const getForm = () => {
		const { errors } = formState;

		const form = (
			<div className="h-full">
				<F.FormTitle>
					{formTitle === "" ? "Mellon Form" : formTitle}
				</F.FormTitle>
				<F.FContainer formType={formType}>
					<F.Form onSubmit={onSubmit} generalError={errors.general}>
						{errors.general && (
							<F.Error general>{errors.general}</F.Error>
						)}

						{fields}

						<F.Submit submitable={submitable}>
							{submitLabel === "" ? "Submit" : submitLabel}
						</F.Submit>
					</F.Form>
				</F.FContainer>
			</div>
		);

		setForm(form);
	};

	return {
		form: form,
		image: image,
		setErrors: (errors) => lib.setErrors(errors, dispatchFormState),
		resetForm: () =>
			lib.resetForm(
				formFields,
				formType,
				formState,
				image,
				dispatchFormState,
				setSubmitable
			),
		getNameValuePairs: () => lib.getNameValuePairs(formState),
	};
};

export default useForm;
