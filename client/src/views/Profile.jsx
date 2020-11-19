import React, { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../lib/AuthContext";
import { USER_UPDATE } from "../lib/graphql/userQueries";
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
	const [image, setImage] = useState({});

	const [errors, setErrors] = useState({});
	const [formFields, setFormFields] = useState({
		name: "",
		image: "",
		email: "",
		password: "",
		rePassword: "",
	});

	useEffect(() => {
		setImage(context.image);
	}, [context.image]);

	useEffect(() => {
		setFormFields({ ...formFields, image: image.id });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image]);

	const [update, { loading }] = useMutation(USER_UPDATE, {
		variables: {
			...formFields,
			id: context.user.id,
		},
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

			if (location.state && location.state.from.pathname !== "logout") {
				history.push(location.state.from.pathname);
			}
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
		await update();
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
							<ImageUpload
								image={image}
								setImage={setImage}
								inputId="image"
								hasError={errors.image}
							/>
							{errors.image && <Error>{errors.image}</Error>}
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
						<Submit>Update</Submit>
					</Form>
				</FContainer>
			)}
		</div>
	);
};

export default Profile;
