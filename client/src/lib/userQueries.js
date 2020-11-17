import gql from "graphql-tag";

const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			id
			email
			name
			image
			token
		}
	}
`;

const REGISTER = gql`
	mutation register(
		$email: String!
		$password: String!
		$rePassword: String!
		$name: String!
		$image: String!
	) {
		register(
			email: $email
			password: $password
			rePassword: $rePassword
			name: $name
			image: $image
		) {
			id
			email
			name
			image
			token
		}
	}
`;

export default {
	LOGIN,
	REGISTER,
};
