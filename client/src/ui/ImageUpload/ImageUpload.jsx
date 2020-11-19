import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import UserAvatar from "../UserAvatar/UserAvatar";

import classes from "./ImageUpload.classes";

const ImageUpload = ({ image, setImage, inputId, hasError = false }) => {
	const [img, setImg] = useState({ ...image });
	const onDrop = (acceptedFiles) => {
		const blob = URL.createObjectURL(acceptedFiles[0]);
		const filename = acceptedFiles[0].path.split(".")[0];

		setImage({
			...image,
			filename: filename,
			blob: blob,
			file: acceptedFiles[0],
		});
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	useEffect(() => {
		image && setImg({ ...image }) && console.log(image);
	}, [image]);

	return (
		<div>
			<div
				{...getRootProps()}
				className="relative"
				style={{ minHeight: "100px" }}
			>
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
				<input
					{...getInputProps()}
					id={inputId}
					name={inputId}
					accept="image/png, image/jpeg"
				/>
				{img.filename && (
					<div
						className={`${classes.container} ${
							hasError ? "border-red-600" : null
						}`}
					>
						{img.blob ? (
							<UserAvatar
								src={img.blob}
								alt={img.filename.split(".")[0]}
								size="md"
							/>
						) : (
							<UserAvatar
								src={`${process.env.REACT_APP_SERVER_URL}/${img.path}`}
								alt={img.filename.split(".")[0]}
								size="md"
							/>
						)}
					</div>
				)}
			</div>
			<p className={classes.text}>Drop image here, or click to select.</p>
		</div>
	);
};

export default ImageUpload;
