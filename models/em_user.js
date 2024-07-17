"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class emUser extends Model {
        
    }
    emUser.init(
        {
            uuid: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
            name: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
              user_business_uuid: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
             user_business_id: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
             contact: {
                type:DataTypes.STRING,  
                defaultValue:''
            } ,
             email: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
             city: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
             district: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
             status: {
                type:DataTypes.STRING,
                defaultValue:'1'
            }
        },
        {
            sequelize,
            modelName: "em_user",
        }
    );

    // emUser.sync();
    // emUser.sync({ alter: true });
    return emUser;
};
