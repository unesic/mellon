import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../lib/AuthContext";
import { USER_LOGIN } from "../lib/graphql/userQueries";

import {
	FContainer,
	Form,
	Fieldset,
	Input,
	Submit,
	FormTitle,
	Error,
} from "../ui/Form/Form";
import Spinner from "../ui/Spinner";

const Login = ({ history, location }) => {
	const context = useContext(AuthContext);

	const [errors, setErrors] = useState({});
	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
		remember: false,
	});

	const [login, { loading }] = useMutation(USER_LOGIN, {
		variables: { ...formFields },
		onCompleted({ login: userData }) {
			context.login(userData);

			setFormFields({
				email: "",
				password: "",
				remember: false,
			});

			if (location.state && location.state.from.pathname !== "logout") {
				history.push(location.state.from.pathname);
			} else {
				history.push("/");
			}
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
	});

	const onChangeHandler = (e) => {
		setFormFields({
			...formFields,
			[e.target.name]:
				e.target.type === "checkbox"
					? e.target.checked
					: e.target.value,
		});
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		await login();
	};

	return (
		<div className="h-full">
			<FormTitle>Log In</FormTitle>

			{loading ? (
				<Spinner />
			) : (
				<FContainer formType="login">
					<Form onSubmit={onSubmitHandler} generalError={errors.general}>
						{errors.general && <Error general>{errors.general}</Error>}
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
								type="checkbox"
								name="remember"
								label="Keep me signed in"
								onChange={onChangeHandler}
								value={formFields.remember}
							/>
						</Fieldset>
						<Submit>Log In</Submit>
					</Form>
				</FContainer>
			)}
		</div>
	);
};

export default Login;
