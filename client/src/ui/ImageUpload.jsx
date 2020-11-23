import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import UserAvatar from "ui/UserAvatar";

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
					className={`ImageUpload__Overlay ${
						isDragActive && "ImageUpload__OverlayActive"
					}`}
				>
					<p
						className={`ImageUpload__OverlayText ${
							isDragActive && "ImageUpload__OverlayTextActive"
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
						className={`ImageUpload__Container ${
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
			<p className="ImageUpload__Text">
				Drop image here, or click to select.
			</p>
		</div>
	);
};

export default ImageUpload;
