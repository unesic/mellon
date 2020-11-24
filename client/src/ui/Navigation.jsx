import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FaSeedling, FaUser } from "react-icons/fa";
import { BsGearWideConnected } from "react-icons/bs";

import { AuthContext } from "lib/AuthContext";
import UserAvatar from "ui/UserAvatar";

const Navigation = React.memo(() => {
	const context = useContext(AuthContext);
	const history = useHistory();

	return (
		<div className="Navigation__Container">
			<div className="Navigation__ContainerInner">
				<div className="Navigation__SectionFirst">
					<header className="Navigation__Header">
						<FaSeedling className="Navigation__HeaderIcon" />
						Mellon
					</header>
					<div className="Navigation__Links">
						<NavLink
							to="/"
							exact
							className="Navigation__NavLink Navigation__NavLinkInProgress"
							activeClassName="Navigation__NavLinkActive"
						>
							Daily tracking
						</NavLink>
						<NavLink
							to="/my-types"
							exact
							className="Navigation__NavLink Navigation__NavLinkNotDone"
							activeClassName="Navigation__NavLinkActive"
						>
							Types &amp; Subtypes
						</NavLink>
						<NavLink
							to="/analytics"
							exact
							className="Navigation__NavLink Navigation__NavLinkNotDone"
							activeClassName="Navigation__NavLinkActive"
						>
							Analytics dashboard
						</NavLink>
					</div>
				</div>
				<div className="Navigation__Section">
					<header className="Navigation__Header">
						{context.image && context.image.filename ? (
							<UserAvatar
								src={`${process.env.REACT_APP_SERVER_URL}/${context.image.path}`}
								alt={context.image.filename.split(".")[0]}
								size="xs"
							/>
						) : (
							<FaUser className="Navigation__HeaderIcon" />
						)}

						<span className="Navigation__Username">
							{context.user ? context.user.username : "User"}
						</span>
					</header>

					<div className="Navigation__Links">
						{context.user ? (
							<>
								<NavLink
									to="/profile"
									className="Navigation__NavLink Navigation__NavLinkDone"
									activeClassName="Navigation__NavLinkActive"
								>
									Profile
								</NavLink>
								<a
									href="/logout"
									className="Navigation__NavLink Navigation__NavLinkDone"
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
									className="Navigation__NavLink Navigation__NavLinkDone"
									activeClassName="Navigation__NavLinkActive"
								>
									Register
								</NavLink>
								<NavLink
									to="/login"
									className="Navigation__NavLink Navigation__NavLinkDone"
									activeClassName="Navigation__NavLinkActive"
								>
									Login
								</NavLink>
							</>
						)}
					</div>
				</div>
				<div className="Navigation__Section">
					<header className="Navigation__Header">
						<BsGearWideConnected className="Navigation__HeaderIcon" />
						Settings
					</header>

					<div className="Navigation__Links">
						<NavLink
							to="/user-settings"
							className="Navigation__NavLink Navigation__NavLinkNotDone"
							activeClassName="Navigation__NavLinkActive"
						>
							User settings
						</NavLink>
						<NavLink
							to="/user-settings"
							className="Navigation__NavLink Navigation__NavLinkNotDone"
							activeClassName="Navigation__NavLinkActive"
						>
							App settings
						</NavLink>
						<NavLink
							to="/user-settings"
							className="Navigation__NavLink Navigation__NavLinkNotDone"
							activeClassName="Navigation__NavLinkActive"
						>
							Privacy settings
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
});

export default Navigation;
