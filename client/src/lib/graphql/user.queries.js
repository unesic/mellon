import gql from "graphql-tag";

const USER_REGISTER = gql`
	mutation register(
		$first_name: String
		$last_name: String
		$gender: String
		$age: String
		$image: ID!
		$username: String!
		$email: String!
		$password: String!
		$rePassword: String!
	) {
		register(
			first_name: $first_name
			last_name: $last_name
			gender: $gender
			age: $age
			image: $image
			username: $username
			email: $email
			password: $password
			rePassword: $rePassword
		) {
			id
			first_name
			last_name
			gender
			age
			image
			username
			email
			token
		}
	}
`;

const USER_LOGIN = gql`
	mutation login($email: String!, $password: String!, $remember: Boolean!) {
		login(email: $email, password: $password, remember: $remember) {
			id
			first_name
			last_name
			gender
			age
			image
			username
			email
			token
		}
	}
`;

const USER_UPDATE = gql`
	mutation update(
		$id: ID!
		$first_name: String
		$last_name: String
		$gender: String
		$age: String
		$image: ID!
		$username: String!
		$email: String!
		$password: String!
		$rePassword: String!
	) {
		update(
			id: $id
			first_name: $first_name
			last_name: $last_name
			gender: $gender
			age: $age
			image: $image
			username: $username
			email: $email
			password: $password
			rePassword: $rePassword
		) {
			id
			first_name
			last_name
			gender
			age
			image
			username
			email
			token
		}
	}
`;

export { USER_REGISTER, USER_LOGIN, USER_UPDATE };
