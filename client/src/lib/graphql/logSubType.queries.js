import gql from "graphql-tag";

const GET_LOG_SUBTYPES_FROM_IDS = gql`
	query getLogSubTypesFromIds($ids: [ID!]) {
		getLogSubTypesFromIds(ids: $ids) {
			id
			userId
			typeId
			name
			color
		}
	}
`;

export { GET_LOG_SUBTYPES_FROM_IDS };
