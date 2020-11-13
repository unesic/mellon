import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

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
