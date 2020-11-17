import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Homepage from "./views/Homepage";
import Register from "./views/Register";
import Login from "./views/Login";
import Logout from "./views/Logout";

const App = () => {
	return (
		<BrowserRouter>
			<nav className="w-64">
				<Navigation />
			</nav>
			<main className="flex-grow">
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					<Route path="/logout" component={Logout} />
				</Switch>
			</main>
		</BrowserRouter>
	);
};

export default App;
