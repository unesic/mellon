import React, { useContext, useEffect, useReducer, useState } from "react";

import {
	FormTitle,
	FContainer,
	Form,
	Fieldset,
	Input,
	Label,
	Error,
	Submit,
} from "../../ui/Form/Form";
import Spinner from "../../ui/Spinner";
import ImageUpload from "../../ui/ImageUpload/ImageUpload";
import { AuthContext } from "../AuthContext";

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_VALUE":
			return {
				...state,
				[action.payload.name]: {
					...state[action.payload.name],
					value: action.payload.value,
				},
			};
		case "SET_ERROR":
			return {
				...state,
				[action.payload.name]: {
					...state[action.payload.name],
					error: action.payload.value,
				},
			};
		case "RESET_FORM":
			return {
				...action.payload,
			};
		default:
			return state;
	}
};

const getFormState = (fields) => {
	const state = {};

	fields.forEach((f) => {
		state[f.name] = {
			type: f.type || "text",
			name: f.name,
			label: f.label,
			required: f.required || false,
			value: f.value || "",
			placeholder: f.placeholder || "",
			error: "",
			width: `w-${f.width || "full"}`,
		};
	});

	return state;
};

const useForm = (
	{ formFields, formType, formTitle = "", submitLabel = "" },
	onSubmit
) => {
	const context = useContext(AuthContext);
	const [formState, dispatch] = useReducer(reducer, getFormState(formFields));
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
		dispatch({
			type: "RESET_FORM",
			payload: getFormState(formFields),
		});
	}, [JSON.stringify(formFields)]);

	useEffect(() => {
		getForm();
	}, [fields]);

	useEffect(() => {
		getFields();
		updateSubmitable();
	}, [formState, image, context.loading]);

	useEffect(() => {
		if (formType !== "login") {
			dispatch({
				type: "SET_VALUE",
				payload: {
					name: "image",
					value: context.image.id,
				},
			});
			setImage({ ...context.image });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formFields, context.image]);

	const updateSubmitable = () => {
		if (formType === "profile") {
			const done = Object.keys(formState)
				.map((key) => ({
					value: formState[key].value,
					name: formState[key].name,
				}))
				.filter((e) => e.value !== "" && e.name !== "image").length;

			setSubmitable(done);
		} else {
			const { required } = Object.keys(formState)
				.map((key) => ({ required: formState[key].required }))
				.reduce((a, b) => ({
					required: a.required + b.required,
				}));

			const done = Object.keys(formState)
				.map((key) => ({
					value: formState[key].value,
					required: formState[key].required,
				}))
				.filter((e) => e.value !== "" && e.required).length;

			setSubmitable(required === done);
		}
	};

	const onChangeHandler = (e) => {
		dispatch({
			type: "SET_VALUE",
			payload: {
				name: e.target.name,
				value:
					e.target.type === "checkbox"
						? e.target.checked
						: e.target.value,
			},
		});
	};

	const getFields = () => {
		const fields = Object.keys(formState).map((key) => {
			const { type: t } = formState[key];
			if (
				t === "text" ||
				t === "password" ||
				t === "number" ||
				t === "checkbox"
			) {
				return (
					<Fieldset
						key={formState[key].name}
						width={formState[key].width}
					>
						<Input {...formState[key]} onChange={onChangeHandler} />
					</Fieldset>
				);
			} else if (t === "image") {
				return (
					<Fieldset
						key={formState[key].name}
						width={formState[key].width}
					>
						<Label>{formState[key].label}</Label>
						{context.loading ? (
							<Spinner />
						) : (
							<ImageUpload
								image={image}
								setImage={setImage}
								inputId={formState[key].name}
								hasError={formState[key].error}
							/>
						)}
						{formState[key].error && (
							<Error>{formState[key].error}</Error>
						)}
					</Fieldset>
				);
			} else {
				return null;
			}
		});

		setFields(fields);
	};

	const getSubmit = () => {
		return (
			<Submit submitable={submitable}>
				{submitLabel === "" ? "Submit" : submitLabel}
			</Submit>
		);
	};

	const getForm = () => {
		const form = (
			<div className="h-full">
				<FormTitle>
					{formTitle === "" ? "Mellon Form" : formTitle}
				</FormTitle>
				<FContainer formType={formType}>
					<Form onSubmit={onSubmit}>
						{fields}
						{getSubmit()}
					</Form>
				</FContainer>
			</div>
		);

		setForm(form);
	};

	const setErrors = (errors) => {
		Object.keys(errors).forEach((key) => {
			dispatch({
				type: "SET_ERROR",
				payload: {
					name: key,
					value: errors[key],
				},
			});
		});
	};

	const reset = () => {
		const state = getFormState(formFields);
		dispatch({
			type: "RESET_FORM",
			payload: state,
		});
		updateSubmitable();
	};

	const getNVPairs = () => {
		const pairs = {};
		Object.keys(formState).forEach((key) => {
			pairs[key] = formState[key].value;
		});
		return pairs;
	};

	return [form, image, setErrors, reset, getNVPairs];
};

export default useForm;
