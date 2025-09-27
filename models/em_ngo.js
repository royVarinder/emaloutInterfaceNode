"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class emNGOs extends Model {

    }
    emNGOs.init(
        {
            uuid: {
                type: DataTypes.STRING,
                defaultValue: uuidv4()
            },
            ngo_name: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            ngo_email: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            ngo_number: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            ngo_website: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            ngo_logo: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            ngo_description: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            ngo_address: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            ngo_phone: {
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
            modelName: "em_ngo",
        }
    );


    // emNGOs.sync();
    // emNGOs.sync({ alter: true });
    return emNGOs;
};
