import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = { user: null };

if (localStorage.getItem("auth-token")) {
	const decoded = jwtDecode(localStorage.getItem("auth-token"));

	if (decoded.exp * 1000 < Date.now()) {
		window.localStorage.removeItem("auth-token");
	} else {
		initialState.user = decoded;
	}
}

const AuthContext = createContext({
	user: null,
	login: (data) => {},
	logout: () => {},
});

const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const login = (data) => {
		dispatch({
			type: "LOGIN",
			payload: data,
		});

		window.localStorage.setItem("auth-token", data.token);
	};

	const logout = () => {
		dispatch({
			type: "LOGOUT",
		});

		window.localStorage.removeItem("auth-token");
	};

	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout }}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
