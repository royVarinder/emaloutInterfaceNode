const {
    create,
    getAdminUser,
    deleteAdminUser,
    updateUserAdmin,
    getAdminUserById,
    validateAdminUserService,
    getChannelDetailsService,
    addUpdateNewsService,
    getNewsListService,
    getChannelMenuListService,
    getNewsDetailsService
} = require("./adminUser.service");
const { genSaltSync, hashSync } = require('bcrypt');
const md5 = require("md5");
const adminUserTable = require('./../../models').em_ad_users;

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { apiResponse } = require("../../util");
const userModel = require("../../mongoModels/users");
const organizationModel = require("../../mongoModels/organization");
const channelModel = require("../../mongoModels/channel");

module.exports = {
    adminLogin: async (req, res) => {
        try {
            if (!req.body.role || !req.body.email || !req.body.password) {
                return res.json(apiResponse(false, "Invalid request", []));
            }
            let adminChannelOrOrganization = {};
            if (req.body.role === "channel") {
                adminChannelOrOrganization = await channelModel.findOne({ email: req.body.email, password: req.body.password });
                //prevent the fields like password should not come in adminChannelOrOrganization
                if (!adminChannelOrOrganization) {
                    return res.json(apiResponse(false, "Invalid email or password", {}));
                }
            }
            if (req.body.role === "organization") {
                adminChannelOrOrganization = await organizationModel.findOne({ email: req.body.email, password: req.body.password });
                if (!adminChannelOrOrganization) {
                    return res.json(apiResponse(false, "Invalid email or password", {}));
                }
            }
            adminChannelOrOrganization.password = undefined;

            return res.json(apiResponse(true, "Login successful", adminChannelOrOrganization));

        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []))

        }
    },


}
