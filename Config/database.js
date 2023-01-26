require("dotenv").config();
const {createPool} = require('mysql');

const pool  = createPool({
    port :process.env.DB_PORT,
    host : process.env.APP_HOST,
    user : process.env.APP_USER_NAME,
    password : process.env.APP_PASSWORD,
    database :process.env.APP_DB,
});

module.exports = pool;