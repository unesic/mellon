import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import userQueries from "../lib/userQueries";
import {
	FContainer,
	Form,
	Fieldset,
	Input,
	Submit,
} from "../styled_components/Form/Form";
import Spinner from "../styled_components/Spinner";

const Register = () => {
	const [errors, setErrors] = useState({});
	const [formFields, setFormFields] = useState({
		name: "",
		image: "",
		email: "",
		password: "",
		rePassword: "",
	});

	const [register, { loading }] = useMutation(userQueries.REGISTER, {
		variables: { ...formFields },
		onCompleted({ register }) {
			setFormFields({
				name: "",
				image: "",
				email: "",
				password: "",
				rePassword: "",
			});

			// TODO: Set global user state
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
		await register();
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
					Register
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
									label="Name"
									errors={errors.name}
								/>
							</Fieldset>
							<Fieldset>
								<Input
									type="text"
									name="image"
									onChange={onChangeHandler}
									value={formFields.image}
									label="Image"
									errors={errors.image}
								/>
							</Fieldset>
							<Fieldset>
								<Input
									type="text"
									name="email"
									onChange={onChangeHandler}
									value={formFields.email}
									label="Email"
									errors={errors.email}
								/>
							</Fieldset>
							<Fieldset>
								<Input
									type="password"
									name="password"
									label="Password"
									onChange={onChangeHandler}
									value={formFields.password}
									errors={errors.password}
								/>
							</Fieldset>
							<Fieldset>
								<Input
									type="password"
									name="rePassword"
									label="Re-type Password"
									onChange={onChangeHandler}
									value={formFields.rePassword}
									errors={errors.rePassword}
								/>
							</Fieldset>
							<Submit>Register</Submit>
						</Form>
					</FContainer>
				)}
			</div>
		</div>
	);
};

export default Register;
