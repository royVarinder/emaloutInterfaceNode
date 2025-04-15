"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    class emBusiness extends Model {

    }
   
    emBusiness.init(
        {
            uuid: {
                type: DataTypes?.STRING,
                defaultValue: uuidv4()
            },
            status: {
                type: DataTypes?.STRING,
                defaultValue: "1"
            },
            user_name: {
                type: DataTypes?.STRING,
                defaultValue: ""
            },
            user_contact: {
                type: DataTypes?.STRING,
                defaultValue: ""
            },
            user_email: {
                type: DataTypes?.STRING,
                defaultValue: ""
            },
            buss_name: {
                type: DataTypes?.STRING,
                defaultValue: ""
            },
            buss_contact: {
                type: DataTypes?.STRING,
                defaultValue: ""
            },
            description: {
                type: DataTypes?.TEXT,
                defaultValue: ""
            },
            category_id: {
                type: DataTypes?.STRING,
                defaultValue: "",
            },
            buss_address: {
                type: DataTypes?.STRING,
                defaultValue: ""
            },
            buss_city: {
                type: DataTypes?.STRING,
                defaultValue: ""
            },
            buss_district: {
                type: DataTypes?.STRING,
                defaultValue: ""
            },
            features: {
                type: DataTypes?.STRING,
                defaultValue: ""
            },
            weekdays: {
                type: DataTypes?.STRING,
                defaultValue: ""
            },
            buss_images: {
                type: DataTypes?.STRING,
                defaultValue: ""
                
            },
        },
        {
            sequelize,
            modelName: "em_bussiness",
        }
    );

    // emBusiness.belongsTo(Model.emCategory, {foreignKey : "category_id", as : 'category'})
    // emBusiness.sync();
    // emBusiness.sync({ alter: true });
    return emBusiness;
};
