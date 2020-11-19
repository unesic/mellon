import React from "react";

import classes from "./UserAvatar.classes";

const UserAvatar = ({ isDefault = false, src, alt, size = "md", styles }) => {
	return (
		<div className={`${classes.container} ${styles}`}>
			{isDefault ? (
				<img
					src="/default-avatar.png"
					alt="Mellon default avatar"
					className={`${classes.base} ${classes[size]}`}
				/>
			) : (
				<img
					src={src}
					alt={`${alt}'s avatar`}
					className={`${classes.base} ${classes[size]}`}
				/>
			)}
		</div>
	);
};

export default UserAvatar;
