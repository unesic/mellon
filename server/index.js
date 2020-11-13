const { ApolloServer } = require("apollo-server");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

require("./util/arrRemove");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});

mongoose
	.connect(process.env.MONGO_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		return server.listen({ port: process.env.PORT || 5000 });
	})
	.then((res) => {
		console.log(`Server running on ${res.url}`);
	});
