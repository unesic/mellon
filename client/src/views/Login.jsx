import { useContext } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "lib/AuthContext";
import { USER_LOGIN } from "lib/graphql/user.queries";

import useForm from "lib/hooks/useForm";
import formData from "lib/json/loginFormData.json";

const Login = ({ history, location }) => {
	const context = useContext(AuthContext);

	const onSubmit = async (e) => {
		e.preventDefault();
		await login();
	};

	const { form, setErrors, resetForm, getNameValuePairs } = useForm(
		formData,
		onSubmit
	);

	const [login] = useMutation(USER_LOGIN, {
		variables: { ...getNameValuePairs() },
		onCompleted({ login: userData }) {
			context.login(userData);

			resetForm();

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

	return form;
};

export default Login;
