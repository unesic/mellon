import React from "react";
import { NavLink } from "react-router-dom";
import { FaSeedling, FaUser } from "react-icons/fa";

const Navigation = () => {
	const container = ["h-full", "p-3"].join(" ");

	const containerInner = [
		"p-2",
		"border",
		"border-solid",
		"border-gray-400",
		"rounded",
		"bg-gray-100",
	].join(" ");

	const section = [
		"mt-4",
		"pt-2",
		"border-0",
		"border-t",
		"border-solid",
		"border-gray-400",
		"border-opacity-50",
	].join(" ");

	const sectionFirst = [].join(" ");

	const header = [
		"flex",
		"items-center",
		"text-lg",
		"font-semibold",
		"text-gray-600",
		"px-2",
		"mt-1",
		"mb-2",
	].join(" ");

	const headerIcon = ["mr-2", "text-teal-400"].join(" ");

	const links = ["px-2"].join(" ");

	const navLink = [
		"block",
		"p-2",
		"rounded",
		"text-gray-500",
		"hover:bg-gray-200",
		"transition-all",
		"duration-100",
		"ease-in-out",
	].join(" ");

	const navLinkActive = ["text-teal-400"].join(" ");

	return (
		<div className={container}>
			<div className={containerInner}>
				<div className={sectionFirst}>
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
		</div>
	);
};

export default Navigation;
