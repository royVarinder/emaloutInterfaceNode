"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class appMedia extends Model {
        static associate(models) {
            appMedia.belongsTo(models.em_news, {
              foreignKey: 'files',
              as: 'news',
              targetKey: 'files'
            });
        }

    }
    appMedia.init(
        {
            uuid: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            url: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            table_name: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: '1'
            }, 
            files: {
                type: DataTypes.STRING,
                defaultValue: ''
            }
        },
        {
            sequelize,
            modelName: "app_media",
        }
    );

    // appMedia.sync();
    // appMedia.sync({ alter: true });
    return appMedia;
};
