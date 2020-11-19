import gql from "graphql-tag";

const USER_REGISTER = gql`
	mutation register(
		$email: String!
		$password: String!
		$rePassword: String!
		$name: String!
		$image: ID!
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

const USER_LOGIN = gql`
	mutation login($email: String!, $password: String!, $remember: Boolean!) {
		login(email: $email, password: $password, remember: $remember) {
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
		$image: ID!
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
