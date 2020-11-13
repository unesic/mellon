import React from "react";
import { NavLink } from "react-router-dom";
import { FaSeedling, FaUser } from "react-icons/fa";

const Navigation = () => {
	const section = [
		"mb-4",
		"pb-2",
		"border-0",
		"border-b",
		"border-solid",
		"border-gray-100",
		"border-opacity-50",
	].join(" ");

	const header = [
		"flex",
		"items-center",
		"text-lg",
		"font-semibold",
		"text-gray-100",
		"px-2",
		"mb-2",
	].join(" ");

	const headerIcon = ["mr-2"].join(" ");

	const links = ["px-1"].join(" ");

	const navLink = [
		"block",
		"p-2",
		"hover:bg-gray-600",
		"transition-all",
		"duration-100",
		"ease-in-out",
		"text-gray-400",
		"hover:text-gray-200",
		"rounded",
	].join(" ");

	const navLinkActive = ["text-teal-400", "hover:text-teal-300"].join(" ");

	return (
		<div className="h-full bg-gray-700 px-2 py-3">
			<div className={section}>
				<header className={header}>
					<FaSeedling className={headerIcon} />
					Mellon
				</header>
				<div className={links}>
					<NavLink
						to="/"
						exact
						className={navLink}
						activeClassName={navLinkActive}
					>
						App
					</NavLink>
				</div>
			</div>
			<div className={section}>
				<header className={header}>
					<FaUser className={headerIcon} /> User
				</header>
				<div className={links}>
					<NavLink
						to="/register"
						className={navLink}
						activeClassName={navLinkActive}
					>
						Register
					</NavLink>
					<NavLink
						to="/login"
						className={navLink}
						activeClassName={navLinkActive}
					>
						Login
					</NavLink>
					<NavLink
						to="/logout"
						className={navLink}
						activeClassName={navLinkActive}
					>
						Logout
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
