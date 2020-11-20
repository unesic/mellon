import { useContext } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../lib/AuthContext";
import { USER_REGISTER } from "../lib/graphql/userQueries";
import { FILE_UPLOAD } from "../lib/graphql/fileQueries";

import useForm from "../lib/hooks/useForm";
import formData from "../lib/json/registerFormData.json";

const Register = ({ history, location }) => {
	const context = useContext(AuthContext);

	const [register] = useMutation(USER_REGISTER, {
		onCompleted({ register: userData }) {
			context.login(userData);

			reset();

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
					...getNVPairs(),
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
					...getNVPairs(),
				},
			});
		}
	};

	const [form, image, setErrors, reset, getNVPairs] = useForm(
		formData,
		onSubmit
	);

	return form;
};

export default Register;
