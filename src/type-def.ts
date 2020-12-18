import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  type Query {
    getUserInfo(id: String): User
  }
  
  type Mutation {
    updateUserInfo(id: String, name: String): User
  }

  type User {
    user_id: ID
    first_name: String
    last_name: String
    photo: String
    creation_date: String
  }
`;
