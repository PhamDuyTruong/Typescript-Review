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
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import session from 'express-session';
import {COOKIE_NAME, __prod__} from './constants'
import {Context} from './types/Context'
import { PostResolver } from "./resolvers/post";
import cors from 'cors'
import { Upvote } from "./entities/Upvote";

const main = async () => {
    const connection = await createConnection({
        type: 'postgres',
        database: 'reddit',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [User, Post, Upvote]
    })

    if (__prod__) await connection.runMigrations()

    const app = express();

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))

    // Session/cookies
    const URL = `mongodb+srv://edricpham:${process.env.PASSWORD}@cluster0.2fqr7wc.mongodb.net/?retryWrites=true&w=majority`
    await mongoose.connect(URL);
    console.log("MongoDB connected");

    app.set('trust proxy', 1)


    app.use(session({
        name: COOKIE_NAME,
        store: MongoStore.create({mongoUrl: URL}),
        cookie: {
            maxAge: 1000 * 60 * 60, // 1 giờ
            httpOnly: true,
            secure: __prod__, // cookie only works in https
            sameSite: 'lax' // CSRF
        },
        secret: process.env.SESSION_SECRET_DEV_PROD as string,
        saveUninitialized: false, // don't save empty sessions, right from the start
        resave: false
    }))


    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, UserResolver, PostResolver],
            validate: false
        }),
        context: ({ req, res }): Context => ({
			req,
			res,
            connection
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
