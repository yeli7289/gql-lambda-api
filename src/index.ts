import { ApolloServer } from 'apollo-server-lambda';

import { resolvers } from './resolver';
import { typeDefs } from './type-def';

const apolloServer = new ApolloServer({ resolvers, typeDefs });

export const graphqlHandler = apolloServer.createHandler();