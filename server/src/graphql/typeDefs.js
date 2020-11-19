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
	}

	type LogType {
		id: ID!
		userId: ID!
		name: String!
		subtypes: [ID]!
	}

	type Log {
		id: ID!
		userId: ID!
		dayId: ID!
		typeId: ID!
		subtypeId: ID!
		additional: String!
		timestamp: String!
	}

	type Day {
		id: ID!
		userId: String!
		logs: [ID]!
		date: String!
	}

	type User {
		id: ID!
		email: String!
		name: String!
		image: ID!
		days: [ID]!
		token: String!
	}

	type Query {
		getUsers: [User]
		getUser(userId: ID!): User!

		getDays: [Day]
		getDay(dayId: ID!): Day!

		getLogs: [Log]
		getLog(logId: ID!): Log!

		getLogTypes: [LogType]
		getLogType(typeId: ID!): LogType!

		getLogSubTypes: [LogSubType]
		getLogSubType(subtypeId: ID!): LogSubType

		getFile(fileId: ID!): File!
	}

	type Mutation {
		register(
			email: String!
			password: String!
			rePassword: String!
			name: String!
			image: ID!
		): User!
		login(email: String!, password: String!): User!
		update(
			id: ID!
			email: String
			password: String
			rePassword: String
			name: String
			image: ID
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
			typeId: String
			subtypeId: String
			additional: String
			timestamp: String
		): Log!
		deleteLog(logId: ID!): String!

		createLogType(name: String!): LogType!
		updateLogType(name: String, subtypes: [String!]): LogType!
		deleteLogType(typeId: ID!): String!

		createLogSubType(typeId: ID!, name: String!): LogSubType!
		updateLogSubType(name: String!): LogSubType!
		deleteLogSubType(subtypeId: ID!): String!

		singleUpload(file: Upload!): File!
	}
`;
