import React, { createContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useLazyQuery } from "@apollo/client";

import { GET_FILE } from "./graphql/fileQueries";

const initialState = { user: null, image: {}, loading: true };

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
	loading: true,
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
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload,
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

			dispatch({
				type: "SET_LOADING",
				payload: false,
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
		} else {
			setImage(process.env.REACT_APP_DEFAULT_USER_AVATAR); // default user avatar
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.user]);

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
			value={{
				...state,
				login,
				logout,
			}}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
