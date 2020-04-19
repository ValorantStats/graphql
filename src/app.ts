import 'reflect-metadata'
import express from 'express';
import config from './config'
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, AuthChecker } from "type-graphql";
import { createConnection } from "typeorm";
import cookieParser from 'cookie-parser'
import jwt from 'express-jwt'
import { Guns } from './entity/guns';
import { UsersResolver } from './resolvers/guns';
import { authChecker } from './misc';

async function bootstrap() {
    await createConnection({
        type: "mongodb",
        host: config.mongo.host,
        port: config.mongo.port,
        database: config.mongo.database,
        entities: [Guns],
        synchronize: true
    });

    const app = express();
    const server = new ApolloServer({ 
        schema: await buildSchema({
            validate: false,
            resolvers: [UsersResolver],
            authChecker,
        }),
        playground: {
            settings: {
                'request.credentials': 'include',
            }
        },
        context: ({req, res}) => ({req, res})
    });
    app.use(cookieParser())
    app.use(jwt({
        secret: config.server.jwt,
        credentialsRequired: false,
        getToken: function fromCookies (req) {
            if (req.cookies.jwt && req.cookies.jwt.split(' '[0] === 'Bearer')) {
                return req.cookies.jwt.split(' ')[1]
            }
            return null
        }
    }));

    server.applyMiddleware({ app });

    app.listen({ port: config.server.port }, () => console.log('Now browse to http://localhost:' + config.server.port + server.graphqlPath))
}

bootstrap()