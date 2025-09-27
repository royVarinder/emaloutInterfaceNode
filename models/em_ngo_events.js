"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class emNGOEvents extends Model {

    }
    emNGOEvents.init(
        {
            uuid: {
                type: DataTypes.STRING,
                defaultValue: uuidv4()
            },
            ngo_id: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            event_name: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            event_description: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            event_date: {
                type: DataTypes.DATE,
                defaultValue: null
            },
            event_location: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            event_image: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            is_active: {
                type: DataTypes.TINYINT,
                defaultValue: 1
            }
        },
        {
            sequelize,
            modelName: "em_ngo_events",
        }
    );


    // emNGOEvents.sync();
    // emNGOEvents.sync({ alter: true });
    return emNGOEvents;
};
