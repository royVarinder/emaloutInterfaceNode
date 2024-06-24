"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class emNews extends Model {
        
    }
    emNews.init(
        {
            bus_email: DataTypes.STRING,
            uuid: DataTypes.STRING,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            is_active: DataTypes.BOOLEAN,
            is_delete: DataTypes.BOOLEAN,
            mobile_number: DataTypes.STRING,
            address: DataTypes.STRING,
            roles: DataTypes.STRING,
            email_verified: DataTypes.BOOLEAN,
            password: DataTypes.STRING,
            has_password: DataTypes.BOOLEAN,
            profile_url: DataTypes.STRING,
            email_verify_token: DataTypes.STRING,
            change_password_token: DataTypes.STRING,
            login_type: DataTypes.STRING,
            provider_token: DataTypes.STRING,
            bus_acnt_name: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            country: DataTypes.STRING,
            otp: DataTypes.STRING,
            otp_expiry: DataTypes.STRING,
            dob: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "em_users",
        }
    );

    // emNews.sync();
    // emNews.sync({ alter: true });
    return emNews;
};
