import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  type Query {
    getUserInfo(id: String): User
    verifyAccount(account: String, password: String): User
    getPolls(ids: [String] ): [Poll]
    getPoll(id: String): Poll
  }
  
  type Mutation {
    updateUserInfo(id: String, name: String): User
  }

  type User {
    user_id: ID!
    first_name: String!
    last_name: String!
    creation_date: String!
    photo: String,
    polls: [Poll]
  }

  type Poll {
    poll_id: ID!,
    user: User,
    title: String!,
    post_date: String!,
    expire_date: String!,
    category_id: ID
  }
`;
