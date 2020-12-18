import { userTable } from './knex';
import Knex from "knex";
import { User } from './integration/User';

const db = Knex(userTable);
console.log("connection establish for userTable: " + userTable);
export const resolvers = {
    Query: {
      getUserInfo: (root, args) => 
      (
        db('user').where('user_id', args.id).then(users => {
          console.log(args.id);
          const user = users[0];
          console.log(users.toString);
          console.log(user);
          if (!user) {
            throw new Error('user not found!');
          }
          return user;
        })
      )
    }
};