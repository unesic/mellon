import { useContext, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "lib/AuthContext";
import { USER_UPDATE } from "lib/graphql/user.queries";
import { FILE_UPLOAD } from "lib/graphql/file.queries";

import useForm from "lib/hooks/useForm";
import formDataJson from "lib/json/profileFormData.json";

const Profile = ({ history, location }) => {
	const context = useContext(AuthContext);
	const formDataRef = useRef(formDataJson);

	useEffect(() => {
		const { formFields } = formDataRef.current;
		const newFormFields = formFields
			.map((f) => {
				if (context.user[f.name]) f.placeholder = context.user[f.name];
				return f;
			})
			.filter(Boolean);

		formDataRef.current.formFields = [...newFormFields];
	}, [context.user]);

	const [update] = useMutation(USER_UPDATE, {
		onCompleted({ update: userData }) {
			context.login(userData);
			resetForm();

			if (location.state && location.state.from.pathname !== "logout")
				history.push(location.state.from.pathname);
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
	});

	const [singleUpload] = useMutation(FILE_UPLOAD, {
		async onCompleted({ singleUpload }) {
			await update({
				variables: {
					...getNameValuePairs(),
					id: context.user.id,
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
			await update({
				variables: {
					...getNameValuePairs(),
					id: context.user.id,
				},
			});
		}
	};

	const { form, image, setErrors, resetForm, getNameValuePairs } = useForm(
		formDataRef.current,
		onSubmit
	);

	return form;
};

export default Profile;
