import { useContext } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "lib/AuthContext";
import { USER_REGISTER } from "lib/graphql/user.queries";
import { FILE_UPLOAD } from "lib/graphql/file.queries";

import useForm from "lib/hooks/useForm";
import formData from "lib/json/registerFormData.json";

const Register = ({ history, location }) => {
	const context = useContext(AuthContext);

	const [register] = useMutation(USER_REGISTER, {
		onCompleted({ register: userData }) {
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

	const [singleUpload] = useMutation(FILE_UPLOAD, {
		async onCompleted({ singleUpload }) {
			await register({
				variables: {
					...getNameValuePairs(),
					image: singleUpload.id,
				},
			});
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
	});

	const onSubmit = async (e) => {
		e.preventDefault();

		if (image.file) {
			await singleUpload({ variables: { file: image.file } });
		} else {
			await register({
				variables: {
					...getNameValuePairs(),
				},
			});
		}
	};

	const { form, image, setErrors, resetForm, getNameValuePairs } = useForm(
		formData,
		onSubmit
	);

	return form;
};

export default Register;
