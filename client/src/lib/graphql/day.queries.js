import gql from "graphql-tag";

const DAY_FROM_UID_AND_DATE = gql`
	query getDayFromDate($date: String!) {
		getDayFromDate(date: $date) {
			id
			logs
			date
		}
	}
`;

const CREATE_DAY = gql`
	mutation createDay($date: String!) {
		createDay(date: $date) {
			id
			logs
			date
		}
	}
`;

export { DAY_FROM_UID_AND_DATE, CREATE_DAY };
