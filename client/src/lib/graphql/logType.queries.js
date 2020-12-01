import gql from "graphql-tag";

const CREATE_LOG_TYPE = gql`
	mutation createLogType($name: String!, $color: String) {
		createLogType(name: $name, color: $color) {
			id
			userId
			name
			color
			enabled
			subtypes
		}
	}
`;

const GET_LOG_TYPES = gql`
	query getUserLogTypes {
		getUserLogTypes {
			id
			userId
			name
			color
			enabled
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
			enabled
		}
	}
`;

const UPDATE_LOG_TYPE = gql`
	mutation updateLogType(
		$id: ID!
		$name: String
		$color: String
		$enabled: Boolean
	) {
		updateLogType(id: $id, name: $name, color: $color, enabled: $enabled) {
			id
			userId
			name
			color
			enabled
			subtypes
		}
	}
`;

export { CREATE_LOG_TYPE, GET_LOG_TYPES, GET_LOG_SUB_TYPES, UPDATE_LOG_TYPE };
