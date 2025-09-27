"use strict";
const { Model, UUIDV4 } = require("sequelize");
const { v4: uuid } = require('uuid')
module.exports = (sequelize, DataTypes) => {
    class emChannel extends Model {
        static associate(models) {
            emChannel.hasMany(models.app_media, {
                foreignKey: 'channel_id',
                as: 'channel_media',
            });
            emChannel.hasMany(models.em_news, {
                foreignKey: 'channel_id',
                as: 'channel_news',
            });
        }
    }
    emChannel.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                defaultValue: uuid()
            },
            uuid: {
                type: DataTypes.STRING,
                defaultValue: uuid()
            },

            name: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            email: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            logo: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            description: {
                type: DataTypes.TEXT,
                defaultValue: '',
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: '1'
            },
            password: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            files: {
                type: DataTypes.STRING,
                defaultValue: ''
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
