import gql from "graphql-tag";

const USER_LOG_TYPES = gql`
	query getUserLogTypes {
		getUserLogTypes {
			id
			userId
			name
			subtypes
		}
	}
`;

const USER_LOG_SUB_TYPES = gql`
	query getLogTypeSubTypes($typeId: ID!) {
		getLogTypeSubTypes(typeId: $typeId) {
			id
			typeId
			userId
			name
		}
	}
`;

export { USER_LOG_TYPES, USER_LOG_SUB_TYPES };
