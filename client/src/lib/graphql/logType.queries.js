import gql from "graphql-tag";

const GET_LOG_TYPES = gql`
	query getUserLogTypes {
		getUserLogTypes {
			id
			userId
			name
			color
			subtypes
		}
	}
`;

const GET_LOG_SUB_TYPES = gql`
	query getLogTypeSubTypes($typeId: ID!) {
		getLogTypeSubTypes(typeId: $typeId) {
			id
			typeId
			userId
			name
			color
		}
	}
`;

export { GET_LOG_TYPES, GET_LOG_SUB_TYPES };
