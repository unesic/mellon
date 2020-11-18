import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FaSeedling, FaUser } from "react-icons/fa";

import { AuthContext } from "../AuthContext";

import classes from "./Navigation.classes";

const Navigation = () => {
	const context = useContext(AuthContext);
	const history = useHistory();

	return (
		<div className={classes.container}>
			<div className={classes.containerInner}>
				<div className={classes.sectionFirst}>
					<header className={classes.header}>
						<FaSeedling className={classes.headerIcon} />
						Mellon
					</header>
					<div className={classes.links}>
						<NavLink
							to="/"
							exact
							className={classes.navLink}
							activeClassName={classes.navLinkActive}
						>
							App
						</NavLink>
					</div>
				</div>
				<div className={classes.section}>
					<header className={classes.header}>
						<FaUser className={classes.headerIcon} />{" "}
						{context.user ? context.user.name : "User"}
					</header>

					<div className={classes.links}>
						{context.user ? (
							<>
								<NavLink
									to="/profile"
									className={classes.navLink}
									activeClassName={classes.navLinkActive}
								>
									Profile
								</NavLink>
								<a
									href="/logout"
									className={classes.navLink}
									onClick={(e) => {
										e.preventDefault();
										context.logout();
										history.push("/");
									}}
								>
									Log Out
								</a>
							</>
						) : (
							<>
								<NavLink
									to="/register"
									className={classes.navLink}
									activeClassName={classes.navLinkActive}
								>
									Register
								</NavLink>
								<NavLink
									to="/login"
									className={classes.navLink}
									activeClassName={classes.navLinkActive}
								>
									Login
								</NavLink>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
