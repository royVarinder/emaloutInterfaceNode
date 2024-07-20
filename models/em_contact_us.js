"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class contactUs extends Model {
        
    }
    contactUs.init(
        {
             uuid: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
             name: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
            email: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
             subject: {
                type:DataTypes.STRING,
                defaultValue:''
            } ,
             massage: {
                type:DataTypes.STRING,
                defaultValue:'1'
            } ,
             status : {
                type:DataTypes.STRING,
                defaultValue:'1'
            } 
        },
        {
            sequelize,
            modelName: "em_contact_us",
        }
    );

    // contactUs.sync();
    // contactUs.sync({ alter: true });
    return contactUs;
};
