import React, { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../lib/AuthContext";
import { USER_UPDATE } from "../lib/graphql/userQueries";
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

const Profile = ({ history, location }) => {
	const context = useContext(AuthContext);
	const [image, setImage] = useState(null);
	const [submitable, setSubmitable] = useState({ img: false, fields: false });

	const [errors, setErrors] = useState({});
	const [formFields, setFormFields] = useState({
		name: "",
		image: "",
		email: "",
		password: "",
		rePassword: "",
	});

	useEffect(() => {
		!context.loading && setImage({ ...context.image });
	}, [context.image, context.loading]);

	useEffect(() => {
		image && image.blob && setSubmitable({ ...submitable, img: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image]);

	useEffect(() => {
		const filtered = Object.filter(formFields, (f) => f !== "");
		setSubmitable({
			...submitable,
			fields: Object.keys(filtered).length > 0,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formFields]);

	const [update, { loading }] = useMutation(USER_UPDATE, {
		onCompleted({ update: userData }) {
			context.login(userData);

			setFormFields({
				name: "",
				image: "",
				email: "",
				password: "",
				rePassword: "",
			});

			setErrors({});

			setSubmitable({ img: false, fields: false });

			if (location.state && location.state.from.pathname !== "logout") {
				history.push(location.state.from.pathname);
			}
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
	});

	const [singleUpload] = useMutation(FILE_UPLOAD, {
		async onCompleted({ singleUpload }) {
			await update({
				variables: {
					...formFields,
					id: context.user.id,
					image: singleUpload.id,
				},
			});
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
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
			await update({
				variables: {
					...formFields,
					id: context.user.id,
				},
			});
		}
	};

	return (
		<div className="h-full">
			<FormTitle>Profile</FormTitle>

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
								placeholder={context.user.name}
								label="Name"
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
								placeholder={context.user.email}
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
							submitable={submitable.img || submitable.fields}
						>
							Update
						</Submit>
					</Form>
				</FContainer>
			)}
		</div>
	);
};

export default Profile;
