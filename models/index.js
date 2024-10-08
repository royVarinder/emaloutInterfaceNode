// sequelize.js
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');




const basename = path.basename(__filename);

let sequelize = new Sequelize(process.env.APP_DB, process.env.APP_USER_NAME, process.env.APP_PASSWORD, {
    host: process.env.APP_HOST,
    dialect: 'mysql', // or 'postgres' or 'sqlite'
    logging: true, // disable logging; default: console.log
});
const db = {}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// sequelize.sync({alter:true})
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
