import React, { createContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useLazyQuery } from "@apollo/client";

import { GET_FILE } from "./graphql/fileQueries";

const initialState = { user: null, image: {} };

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
	image: {},
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
		case "SET_IMAGE":
			return {
				...state,
				image: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
				image: {},
			};
		default:
			return state;
	}
};

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const [getFile] = useLazyQuery(GET_FILE, {
		onCompleted({ getFile: imageData }) {
			dispatch({
				type: "SET_IMAGE",
				payload: imageData,
			});
		},
		onError(err) {
			console.log(JSON.stringify(err, null, 2));
		},
	});

	const setImage = async (imageId) => {
		await getFile({
			variables: { fileId: imageId },
		});
	};

	useEffect(() => {
		if (state.user) {
			setImage(state.user.image);
		}
	}, []);

	const login = async (userData) => {
		setImage(userData.image);

		dispatch({
			type: "LOGIN",
			payload: userData,
		});

		window.localStorage.setItem("auth-token", userData.token);
	};

	const logout = () => {
		dispatch({
			type: "LOGOUT",
		});

		window.localStorage.removeItem("auth-token");
	};

	return (
		<AuthContext.Provider
			value={{ user: state.user, image: state.image, login, logout }}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
