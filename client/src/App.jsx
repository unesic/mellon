import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "ui/Navigation/Navigation";
import PrivateRoute from "lib/PrivateRoute";
import PublicRoute from "lib/PublicRoute";
import Homepage from "views/Homepage";
import Register from "views/Register";
import Login from "views/Login";
import Logout from "views/Logout";
import Profile from "views/Profile";

const App = () => {
	return (
		<BrowserRouter>
			<nav className="w-64">
				<Navigation />
			</nav>
			<main className="flex-grow p-3">
				<Switch>
					<Route exact path="/" component={Homepage} />
					<PublicRoute path="/register" component={Register} />
					<PublicRoute path="/login" component={Login} />
					<PrivateRoute path="/logout" component={Logout} />
					<PrivateRoute path="/profile" component={Profile} />
				</Switch>
			</main>
		</BrowserRouter>
	);
};

export default App;
