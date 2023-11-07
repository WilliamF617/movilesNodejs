import { createPool } from 'mysql2/promise'
import { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } from './config.js'
const pool = createPool({
    host: DB_HOST, //ya
    user: DB_USER,//ya
    password: DB_PASSWORD,//ya
    port: DB_PORT,//ya
    database: DB_NAME //ya
})

export { pool }
