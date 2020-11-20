import { useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../lib/AuthContext";
import { USER_UPDATE } from "../lib/graphql/userQueries";
import { FILE_UPLOAD } from "../lib/graphql/fileQueries";

import useForm from "../lib/hooks/useForm";
import formDataJson from "../lib/json/profileFormData.json";

const Profile = ({ history, location }) => {
	const context = useContext(AuthContext);
	let formData = formDataJson;

	useEffect(() => {
		const { formFields } = formData;
		const newFormFields = formFields
			.map((f) => {
				if (context.user[f.name]) {
					return (f.placeholder = context.user[f.name]);
				}
			})
			.filter(Boolean);
		formData = { ...newFormFields };
	}, [context.user]);

	const [update] = useMutation(USER_UPDATE, {
		onCompleted({ update: userData }) {
			context.login(userData);

			reset();

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
					...getNVPairs(),
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
					...getNVPairs(),
					id: context.user.id,
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

export default Profile;
