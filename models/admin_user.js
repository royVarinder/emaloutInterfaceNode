"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class adminUser extends Model {
        
    }
    adminUser.init(
        {
            uuid: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
            admin_username: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
             admin_password: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
             admin_channel: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
             status: {
                type:DataTypes.STRING,
                defaultValue:'1'
            } ,
             status_test: {
                type:DataTypes.STRING,
                defaultValue:'1'
            } 
        },
        {
            sequelize,
            modelName: "ADMIN_USER",
        }
    );

    // adminUser.sync();
    // adminUser.sync({ alter: true });
    return adminUser;
};
