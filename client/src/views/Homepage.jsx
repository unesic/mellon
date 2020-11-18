import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const Homepage = ({ location }) => {
	const { loading, data } = useQuery(FETCH_DAYS_QUERY);

	useEffect(() => {
		// if (data) console.log(data);
		// location.state && console.log(location.state.msg)
	}, [data]);

	return (
		<h1>Homepage</h1>
	);
};

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
