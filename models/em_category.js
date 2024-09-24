"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class emCategory extends Model {
        
    }
    emCategory.init(
        {
            uuid: {
                type:DataTypes.STRING,
                defaultValue:uuidv4()
            } ,
            category_name: {
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
            modelName: "em_category",
        }
    );


    // emCategory.sync();
    // emCategory.sync({ alter: true });
    return emCategory;
};
