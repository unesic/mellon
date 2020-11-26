import gql from "graphql-tag";

const CREATE_LOG = gql`
	mutation createLog(
		$dayId: ID!
		$typeId: ID!
		$subtypeId: ID!
		$additional: String
		$timestamp: String!
	) {
		createLog(
			dayId: $dayId
			typeId: $typeId
			subtypeId: $subtypeId
			additional: $additional
			timestamp: $timestamp
		) {
			id
			userId
			typeId
			subtypeId
			additional
			timestamp
			createdAt
		}
	}
`;

const GET_LOGS_BY_IDS = gql`
	query getLogsByIds($ids: [ID!]) {
		getLogsByIds(ids: $ids) {
			id
			userId
			typeId
			subtypeId
			additional
			timestamp
			createdAt
		}
	}
`;

const DELETE_LOG = gql`
	mutation deleteLog($logId: ID!) {
		deleteLog(logId: $logId)
	}
`;

const UPDATE_LOG = gql`
	mutation updateLog(
		$id: ID!
		$typeId: ID
		$subtypeId: ID
		$additional: String
		$timestamp: String
	) {
		updateLog(
			id: $id
			typeId: $typeId
			subtypeId: $subtypeId
			additional: $additional
			timestamp: $timestamp
		) {
			id
			userId
			typeId
			subtypeId
			additional
			timestamp
			createdAt
		}
	}
`;

export { CREATE_LOG, GET_LOGS_BY_IDS, DELETE_LOG, UPDATE_LOG };
