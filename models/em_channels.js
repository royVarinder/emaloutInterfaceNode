"use strict";
const { Model, UUIDV4 } = require("sequelize");
const { v4: uuid } = require('uuid')
module.exports = (sequelize, DataTypes) => {
    class emChannel extends Model {

    }
    emChannel.init(
        {
            uuid: {
                type: DataTypes.STRING,
                defaultValue: uuid()
            },
            name: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            channel_logo: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            description : {
                type : DataTypes?.STRING,
                defaultValue : '',
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: '1'
            }
        },
        {
            sequelize,
            modelName: "em_channel",
        }
    );

    // emChannel.sync();
    // emChannel.sync({ alter: true });
    return emChannel;
};
