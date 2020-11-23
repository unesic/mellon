import React, { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

import { AuthContext } from "lib/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const context = useContext(AuthContext);
	const location = useLocation();

	return (
		<Route
			{...rest}
			render={(props) =>
				context.user ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: "/login", state: { from: location } }}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
