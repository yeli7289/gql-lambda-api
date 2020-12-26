import { mysqlDb } from '../database';
import { User } from "../user/userService";
import Knex from "knex";

export interface Poll {
    readonly poll_id?: string;
    readonly user?: User;
    readonly title?: string;
    readonly post_date?: Date;
    readonly expire_date?: Date;
    readonly category_id?: string;
}

const db = Knex(mysqlDb);
console.log("connection establish the database");

export async function getPolls(poll_ids: string[]): Promise<Poll[]> {
    // join poll and user two tables
    return await db('poll').join('user', 'poll.user_id', '=', 'user.user_id')
    .whereIn('poll_id', poll_ids)
    .select('*')
    .then(rows => {
        console.log(rows);
        return rows.map(row => <Poll>{
            poll_id: row.poll_id,
            user: <User> {
                user_id: row.user_id,
                first_name: row.first_name,
                last_name: row.last_name,
                photo: row.photo,
                creation_date: row.creation_date
            },
            title: row.title,
            post_date: row.post_date,
            expiration_date: row.expire_date,
            category_id: row.category_id
        })
    });
}