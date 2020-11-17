import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const Homepage = () => {
	const { loading, data } = useQuery(FETCH_DAYS_QUERY);

	useEffect(() => {
		if (data) console.log(data);
	}, [data]);

	return <h1>Homepage</h1>;
};

const FETCH_USERS_QUERY = gql`
	{
		getUsers {
			id
			name
			email
			image
			days
		}
	}
`;

const FETCH_DAYS_QUERY = gql`
	{
		getDays {
			id
			date
			logs
		}
	}
`;

export default Homepage;
