import React from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";

import { FILE_UPLOAD } from "../../lib/graphql/fileQueries";

import UserAvatar from "../UserAvatar/UserAvatar";

import classes from "./ImageUpload.classes";

const ImageUpload = ({ image, setImage, inputId, hasError = false }) => {
	const [singleUpload] = useMutation(FILE_UPLOAD, {
		onCompleted({ singleUpload }) {
			setImage(singleUpload);
		},
		onError(err) {
			console.log(JSON.stringify(err, null, 2));
		},
	});

	const onDrop = async (acceptedFiles) => {
		await singleUpload({
			variables: { file: acceptedFiles[0] },
		});
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	return (
		<div>
			<div {...getRootProps()} className="relative">
				<div
					className={`${classes.overlay} ${
						isDragActive && classes.overlayActive
					}`}
				>
					<p
						className={`${classes.overlayText} ${
							isDragActive && classes.overlayTextActive
						}`}
					>
						Drop the image here...
					</p>
				</div>
				<input {...getInputProps()} id={inputId} name={inputId} />
				{image.filename ? (
					<UserAvatar
						src={`http://localhost:5000/${image.path}`}
						alt={image.filename.split(".")[0]}
						size="md"
						styles={hasError && "border-red-600"}
					/>
				) : (
					<UserAvatar
						isDefault
						styles={hasError && "border-red-600"}
					/>
				)}
			</div>
			<p className={classes.text}>Drop image here, or click to select.</p>
		</div>
	);
};

export default ImageUpload;
