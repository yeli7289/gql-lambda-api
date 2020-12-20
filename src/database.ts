import * as config from './config.json'

export const mysqlDb = {
    client: 'mysql',
    connection: {
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    }
}