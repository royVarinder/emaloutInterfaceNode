"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class emNews extends Model {

    }
    emNews.init(
        {
            uuid: DataTypes.STRING,
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            author_name: DataTypes.STRING,
            facebook_link: DataTypes.STRING,
            insta_link: DataTypes.STRING,
            youtube_link: DataTypes.STRING,
            status: DataTypes.STRING,
            files: {
                type: DataTypes.STRING,
                defaultValue: ""
            },
            // videos : DataTypes.STRING,
            channel_id: DataTypes.STRING,
            author_id: DataTypes.STRING,
            city_id: DataTypes.STRING
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