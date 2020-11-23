import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { AuthContext } from "lib/AuthContext";

const PublicRoute = ({ component: Component, ...rest }) => {
	const context = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				context.user ? (
					<Redirect
						to={{
							pathname: "/",
							state: { msg: "You are already logged in!" },
						}}
					/>
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PublicRoute;
