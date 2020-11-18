import gql from "graphql-tag";

const USER_LOGIN = gql`
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

const USER_REGISTER = gql`
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

const USER_UPDATE = gql`
	mutation update(
		$id: ID!
		$email: String!
		$password: String!
		$rePassword: String!
		$name: String!
		$image: String!
	) {
		update(
			id: $id
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

export { USER_LOGIN, USER_REGISTER, USER_UPDATE };
