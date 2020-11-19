import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import { AuthProvider } from "./lib/AuthContext";
import App from "./App";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: createUploadLink({ uri: "http://localhost:5000/graphql" }),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
