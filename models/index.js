// sequelize.js
const { Sequelize } = require('sequelize');

let sequelize = new Sequelize(process.env.APP_DB, process.env.APP_USER_NAME, process.env.APP_PASSWORD, {
    host: process.env.APP_HOST,
    dialect: 'mysql', // or 'postgres' or 'sqlite'
    logging: true, // disable logging; default: console.log
});

sequelize.sync({ alter: true })
module.exports = { sequelize };
