import { mysqlDb } from '../database';
import Knex from "knex";

interface User {
    readonly user_id?: string;
    readonly first_name?: string;
    readonly last_name?: string;
    readonly photo?: string;
    readonly creation_date?: Date;
}

const db = Knex(mysqlDb);
console.log("connection establish for userTable: ");

export async function getUserWithId(user_id: string): Promise<User> {
    return db('user').where('user_id', user_id).then(users => {
        const user = users[0];
        console.log("get user with user_id: " + user_id)
        if (!user) {
          throw new Error("no user not found for user_id: " + user_id);
        }
        console.log(user);
        return user
    }) as User
}

export async function verifyAccount(account: string, password: string): Promise<string> {
    return db('user').where({
        account: account,
        password: password
    }).select('user_id').then(userIds => {
        const userId = userIds[0];
        console.log("found the userId for account: ", account);
        if (!userId) {
            throw new Error("account or passward are incorrect!");
        }
        return userId;
    })
}