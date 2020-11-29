import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  type Query {
    user: User
  }

  type User {
    id: ID
    name: String
  }
`;
