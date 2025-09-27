"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    class emNewsComment extends Model {
        static associate(models) {
            // Comment belongs to News
            emNewsComment.belongsTo(models.em_news, {
              foreignKey: 'news_id',
              as: 'em_news',
            });
          }

    }
    emNewsComment.init(
        {
            uuid: {
                type: DataTypes.STRING,
                defaultValue: uuidv4()
            },
            news_id: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            comment: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: '1'
            }
        },
        {
            sequelize,
            modelName: "em_news_comments",
            timestamps: true
        }
    );
    // emUser.sync();
    // emNewsComment.sync({ alter: true });
    return emNewsComment;
};
