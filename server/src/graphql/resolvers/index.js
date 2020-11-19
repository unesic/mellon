const usersResolvers = require("./users.resolver");
const daysResolver = require("./days.resolver");
const logsResolver = require("./logs.resolver");
const logTypesResolver = require("./logTypes.resolver");
const logSubTypesResolver = require("./logSubTypes.resolver");
const filesResolver = require("./files.resolver");

module.exports = {
	Query: {
		...usersResolvers.Query,
		...daysResolver.Query,
		...logsResolver.Query,
		...logTypesResolver.Query,
		...logSubTypesResolver.Query,
		...filesResolver.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...daysResolver.Mutation,
		...logsResolver.Mutation,
		...logTypesResolver.Mutation,
		...logSubTypesResolver.Mutation,
		...filesResolver.Mutation,
	},
};
