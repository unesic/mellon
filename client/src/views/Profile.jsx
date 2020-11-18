import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../lib/AuthContext";
import { USER_UPDATE } from "../lib/userQueries";

import {
	FContainer,
	Form,
	Fieldset,
	Input,
	Submit,
} from "../styled_components/Form/Form";
import Spinner from "../styled_components/Spinner";

const Profile = ({ history, location }) => {
	const context = useContext(AuthContext);

	const [errors, setErrors] = useState({});
	const [formFields, setFormFields] = useState({
		name: "",
		image: "",
		email: "",
		password: "",
		rePassword: "",
	});

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
		<div className={["p-3", "h-full"].join(" ")}>
			<div className={["pt-16"].join(" ")}>
				<h2
					className={[
						"text-center",
						"font-semibold",
						"text-3xl",
						"mb-5",
					].join(" ")}
				>
					Profile
				</h2>

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
								<Input
									type="text"
									name="image"
									onChange={onChangeHandler}
									value={formFields.image}
									placeholder={context.user.image}
									label="Image"
								/>
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
		</div>
	);
};

export default Profile;
