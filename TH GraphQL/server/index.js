const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
require("dotenv").config();
const mongoDataMethods = require("./data/db");


const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
        });
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}

connectToDB();
const app = express();

async function startServer() {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({mongoDataMethods})
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen({port: 4000}, () => {
        console.log(`Server run at http://localhost:4000${apolloServer.graphqlPath}`);
    })
};

startServer();


