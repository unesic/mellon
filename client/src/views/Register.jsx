import React, { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../lib/AuthContext";
import { USER_REGISTER } from "../lib/graphql/userQueries";
import { FILE_UPLOAD } from "../lib/graphql/fileQueries";
import ImageUpload from "../ui/ImageUpload/ImageUpload";

import {
	FormTitle,
	FContainer,
	Form,
	Fieldset,
	Input,
	Label,
	Error,
	Submit,
} from "../ui/Form/Form";
import Spinner from "../ui/Spinner";

const Register = ({ history, location }) => {
	const [submitable, setSubmitable] = useState({ img: false, fields: false });
	const [image, setImage] = useState({
		id: "",
		filename: "",
		mimetype: "",
		path: "",
	});
	const context = useContext(AuthContext);

	const [errors, setErrors] = useState({});
	const [formFields, setFormFields] = useState({
		name: "",
		image: "",
		email: "",
		password: "",
		rePassword: "",
	});

	useEffect(() => {
		setFormFields({ ...formFields, image: context.image.id });
		setImage({ ...context.image });
		setSubmitable({ ...submitable, img: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context.image]);

	useEffect(() => {
		image &&
			image.blob &&
			setFormFields({ ...formFields, image: image.id });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image]);

	useEffect(() => {
		const filtered = Object.filter(formFields, (f) => f !== "");
		setSubmitable({
			...submitable,
			fields:
				Object.keys(filtered).length === Object.keys(formFields).length,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formFields]);

	const [register, { loading }] = useMutation(USER_REGISTER, {
		onCompleted({ register: userData }) {
			context.login(userData);

			setFormFields({
				name: "",
				image: "",
				email: "",
				password: "",
				rePassword: "",
			});

			if (location.state && location.state.from.pathname !== "logout") {
				history.push(location.state.from.pathname);
			} else {
				history.push("/");
			}
		},
		onError(err) {
			// console.log(JSON.stringify(err, null, 2))
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
	});

	const [singleUpload] = useMutation(FILE_UPLOAD, {
		async onCompleted({ singleUpload }) {
			await register({
				variables: {
					...formFields,
					image: singleUpload.id,
				},
			});
		},
		onError(err) {
			console.log(JSON.stringify(err, null, 2));
		},
	});

	const onChangeHandler = (e) => {
		setFormFields({
			...formFields,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (image.file) {
			await singleUpload({ variables: { file: image.file } });
		} else {
			await register({
				variables: {
					...formFields,
				},
			});
		}
	};

	return (
		<div className="h-full">
			<FormTitle>Register</FormTitle>

			{loading ? (
				<Spinner />
			) : (
				<FContainer formType="register">
					<Form onSubmit={onSubmitHandler}>
						<Fieldset>
							<Input
								type="text"
								name="name"
								onChange={onChangeHandler}
								value={formFields.name}
								label="Name"
								error={errors.name}
							/>
						</Fieldset>
						<Fieldset>
							<Label>Image</Label>
							{context.loading ? (
								<Spinner />
							) : (
								<>
									<ImageUpload
										image={image}
										setImage={setImage}
										inputId="image"
										hasError={errors.image}
									/>
									{errors.image && (
										<Error>{errors.image}</Error>
									)}
								</>
							)}
						</Fieldset>
						<Fieldset>
							<Input
								type="text"
								name="email"
								onChange={onChangeHandler}
								value={formFields.email}
								label="Email"
								error={errors.email}
							/>
						</Fieldset>
						<Fieldset>
							<Input
								type="password"
								name="password"
								label="Password"
								onChange={onChangeHandler}
								value={formFields.password}
								error={errors.password}
							/>
						</Fieldset>
						<Fieldset>
							<Input
								type="password"
								name="rePassword"
								label="Re-type Password"
								onChange={onChangeHandler}
								value={formFields.rePassword}
								error={errors.rePassword}
							/>
						</Fieldset>
						<Submit
							submitable={submitable.img && submitable.fields}
						>
							Register
						</Submit>
					</Form>
				</FContainer>
			)}
		</div>
	);
};

export default Register;
