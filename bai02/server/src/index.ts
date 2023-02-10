require("dotenv").config();
import "reflect-metadata";
import express from "express";
import {createConnection} from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import { UserResolver } from "./resolvers/user";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
    await createConnection({
        type: 'postgres',
        database: 'reddit',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [User, Post]
    })

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, UserResolver],
            validate: false
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({app, cors: false})

    const port = process.env.PORT || 4000
    app.listen(port, () => {
        console.log(`Server started on port 4000. GraphQL server started on localhost:${port}${apolloServer.graphqlPath}`)
    })
};

main().catch(error => console.log(error))
