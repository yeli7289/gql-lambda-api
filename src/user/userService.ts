import { mysqlDb } from '../database';
import { Poll } from '../poll/pollService'
import Knex from "knex";

export interface User {
    readonly user_id: string;
    readonly first_name?: string;
    readonly last_name?: string;
    readonly photo?: string;
    readonly creation_date?: Date;
    readonly polls?: Poll[];
}

const db = Knex(mysqlDb);
console.log("connection establish for database:");

export async function getUserWithId(user_id: string): Promise<User> {
    return await db('user').leftJoin('poll', 'user.user_id', '=', 'poll.user_id')
    .where('user.user_id', user_id).then(rows => {
        console.log("get user with user_id: " + user_id);
        console.log(rows);
        const user = rows[0];
        if (!user) {
          throw new Error("no user not found for user_id: " + user_id);
        }
        let polls: Poll[] = rows.map(row => <Poll> {
            poll_id: row.poll_id,
            title: row.title,
            post_date: row.post_date,
            expire_date: row.expire_date,
            category_id: row.category_id
        })
        return <User> {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            photo: user.photo,
            creation_date: user.creation_date,
            polls: polls
        }
    });
}

export async function verifyAccount(account: string, password: string): Promise<User> {
    return db('user').where({
        account: account,
        password: password
    }).then(users => {
        const user = users[0];
        console.log("found the userId for account: ", account);
        if (!user) {
            throw new Error("account or passward are incorrect!");
        }
        return <User> {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            photo: user.photo,
            creation_date: user.creation_date
        }
    });
}