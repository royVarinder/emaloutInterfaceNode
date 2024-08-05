"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class emCategory extends Model {
        
    }
    emCategory.init(
        {
            uuid: {
                type:DataTypes.STRING,
                defaultValue:''
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
