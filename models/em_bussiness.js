"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class emBussiness extends Model {
        
    }
    emBussiness.init(
        {
            uuid: DataTypes.STRING,
            user_name: DataTypes.STRING,
            user_contact: DataTypes.STRING,
            user_email: DataTypes.STRING,
            buss_name: DataTypes.STRING,
            buss_contact: DataTypes.STRING,
            category_id: DataTypes.STRING,
            buss_address: DataTypes.STRING,
            buss_city: DataTypes.STRING,
            buss_district: DataTypes.STRING,
            features: DataTypes.STRING,
            weekdays: DataTypes.STRING,
            buss_images: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "em_bussiness",
        }
    );

    // emBussiness.sync();
    // emBussiness.sync({ alter: true });
    return emBussiness;
};
