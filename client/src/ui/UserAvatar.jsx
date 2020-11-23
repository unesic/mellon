import React from "react";

const UserAvatar = ({ isDefault = false, src, alt, size = "md", styles }) => {
	return (
		<div className={styles && styles}>
			{isDefault ? (
				<img
					src="/default-avatar.png"
					alt="Mellon default avatar"
					className={`UserAvatar__Base UserAvatar__${size}`}
				/>
			) : (
				<img
					src={src}
					alt={`${alt}'s avatar`}
					className={`UserAvatar__Base UserAvatar__${size}`}
				/>
			)}
		</div>
	);
};

export default UserAvatar;
