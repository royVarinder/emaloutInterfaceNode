"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    class Session extends Model {
        static associate(models) {

        }
    }
    Session.init(
        {
            uuid: {
                type: DataTypes.STRING,
                defaultValue: uuidv4()
            },
            name: DataTypes.STRING,
            phone: DataTypes.STRING,
            session_key: DataTypes.STRING,
            status: {
                type: DataTypes.INTEGER, // 1 = active, 0 = expired
                defaultValue: 1,
            },
            expiresAt: DataTypes.DATE,
            session_type: {
                type: DataTypes.STRING,
                defaultValue: 'user'
            }
        },
        {
            sequelize,
            modelName: "session",
        }
    );

    // Session.sync();
    // Session.sync({ alter: true });
    return Session;
};
