import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../lib/AuthContext";
import { USER_LOGIN } from "../lib/userQueries";

import {
	FContainer,
	Form,
	Fieldset,
	Input,
	Submit,
} from "../styled_components/Form/Form";
import Spinner from "../styled_components/Spinner";

const Login = ({ history, location }) => {
	const context = useContext(AuthContext);

	const [errors, setErrors] = useState({});
	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
	});

	const [login, { loading }] = useMutation(USER_LOGIN, {
		variables: { ...formFields },
		onCompleted({ login: userData }) {
			context.login(userData);

			setFormFields({
				email: "",
				password: "",
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
			[e.target.name]: e.target.value,
		});
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		await login();
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
					Log In
				</h2>

				{loading ? (
					<Spinner />
				) : (
					<FContainer formType="login">
						<Form onSubmit={onSubmitHandler}>
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
							<Submit>Log In</Submit>
						</Form>
					</FContainer>
				)}
			</div>
		</div>
	);
};

export default Login;
