import gql from "graphql-tag";

const CREATE_LOG_SUB_TYPE = gql`
	mutation createLogSubType($typeId: ID!, $name: String!, $color: String) {
		createLogSubType(typeId: $typeId, name: $name, color: $color) {
			id
			userId
			typeId
			name
			color
			enabled
		}
	}
`;

const GET_LOG_SUBTYPES_FROM_IDS = gql`
	query getLogSubTypesFromIds($ids: [ID!]) {
		getLogSubTypesFromIds(ids: $ids) {
			id
			userId
			typeId
			name
			color
			enabled
		}
	}
`;

const UPDATE_LOG_SUBTYPE = gql`
	mutation updateLogSubType(
		$id: ID!
		$name: String
		$color: String
		$enabled: Boolean
	) {
		updateLogSubType(
			id: $id
			name: $name
			color: $color
			enabled: $enabled
		) {
			id
			userId
			typeId
			name
			color
			enabled
		}
	}
`;

export { CREATE_LOG_SUB_TYPE, GET_LOG_SUBTYPES_FROM_IDS, UPDATE_LOG_SUBTYPE };
