const { gql } = require("apollo-server");

module.exports = gql`
	type File {
		id: ID!
		filename: String!
		mimetype: String!
		path: String!
	}

	type LogSubType {
		id: ID!
		userId: ID!
		typeId: ID!
		name: String!
		color: String
		enabled: Boolean
	}

	type LogType {
		id: ID!
		userId: ID!
		name: String!
		subtypes: [ID]!
		color: String
		enabled: Boolean
	}

	type Log {
		id: ID!
		userId: ID!
		dayId: ID!
		typeId: ID!
		subtypeId: ID!
		additional: String
		timestamp: String!
		createdAt: String!
	}

	type Day {
		id: ID!
		userId: String!
		logs: [ID]!
		date: String!
	}

	type User {
		id: ID!
		first_name: String
		last_name: String
		gender: String
		age: String
		image: ID!
		username: String!
		email: String!
		days: [ID]!
		token: String!
	}

	type Query {
		getUsers: [User]
		getUser(userId: ID!): User!

		getDays: [Day]
		getDay(dayId: ID!): Day!
		getDayFromDate(date: String!): Day

		getLogs: [Log]
		getLog(logId: ID!): Log!
		getLogsByIds(ids: [ID!]): [Log!]

		getLogTypes: [LogType]
		getLogType(typeId: ID!): LogType!
		getUserLogTypes: [LogType]
		getLogTypeSubTypes(typeId: ID!): [LogSubType]

		getLogSubTypes: [LogSubType]
		getLogSubType(subtypeId: ID!): LogSubType
		getLogSubTypesFromIds(ids: [ID!]): [LogSubType!]

		getFile(fileId: ID!): File!
	}

	type Mutation {
		register(
			first_name: String
			last_name: String
			gender: String
			age: String
			image: ID!
			username: String!
			email: String!
			password: String!
			rePassword: String!
		): User!
		login(email: String!, password: String!, remember: Boolean!): User!
		update(
			id: ID!
			first_name: String
			last_name: String
			gender: String
			age: String
			image: ID
			username: String
			email: String
			password: String
			rePassword: String
		): User!

		createDay(date: String!): Day!
		deleteDay(dayId: ID!): String!

		createLog(
			dayId: ID!
			typeId: ID!
			subtypeId: ID!
			additional: String
			timestamp: String!
		): Log!
		updateLog(
			id: ID!
			typeId: ID
			subtypeId: ID
			additional: String
			timestamp: String
		): Log!
		deleteLog(logId: ID!): String!

		createLogType(name: String!, color: String): LogType!
		updateLogType(
			id: ID!
			name: String
			color: String
			enabled: Boolean
			subtypes: [String!]
		): LogType!
		deleteLogType(typeId: ID!): String!

		createLogSubType(typeId: ID!, name: String!, color: String): LogSubType!
		updateLogSubType(
			id: ID!
			name: String
			color: String
			enabled: Boolean
		): LogSubType!
		deleteLogSubType(subtypeId: ID!): String!

		singleUpload(file: Upload!): File!
	}
`;
