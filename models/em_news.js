"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class emNews extends Model {
        static associate(models) {
            // Comment belongs to News
            emNews.hasMany(models.em_news_comments, {
              foreignKey: 'news_id',
              as: 'news_comments',
            });
            emNews.hasMany(models.app_media, {
              foreignKey: 'files',
              as: 'news_media',
              sourceKey: 'files'
            });
            emNews.belongsTo(models.em_channel, {
                foreignKey: 'channel_id',
                as: 'channel',
            });
        }
    }
    emNews.init(
        {
            uuid: DataTypes.STRING,
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            author_name: DataTypes.STRING,
            facebook_link: DataTypes.STRING,
            insta_link: DataTypes.STRING,
            youtube_link: DataTypes.STRING,
            status: {
                type: DataTypes.STRING,
                defaultValue: "1"
            },
            files: {
                type: DataTypes.STRING,
                defaultValue: ""
            },
            // videos : DataTypes.STRING,
            
            channel_id: DataTypes.INTEGER,
            // author_id: DataTypes.STRING,
            // city_id: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "em_news",
        }
    );

    // emNews.sync();
    // emNews.sync({ alter: true });
    return emNews;
};