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
const channelTable = require('./../../models').em_channel;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { apiResponse } = require("../../util");
module.exports = {
    createUser: async (req, res) => {
        try {
            const { admin_password } = req.body;
            req.body.admin_password = md5(admin_password);
            req.body['uuid'] = uuidv4();
            const createdAdminUser = await adminUserTable.create(req.body);
            if (!!createdAdminUser) {
                return res.json(apiResponse(true, 'Admin user created successfully', createdAdminUser))
            }
            return res.json(apiResponse(false, 'Failed to create admin user!', []))
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []))

        }
    },
    getAdminUserById: async (req, res) => {
        try {
            const { uuid } = req.body;

            if (!uuid) {
                return res.json({
                    success: 0,
                    message: "UUID is required",
                });
            }
            const existingData = await adminUserTable.findOne({ where: { uuid } });
            if (!existingData) {
                return res.json({
                    success: 0,
                    message: "No data found with the given UUID",
                });
            }
            return res.json({
                success: 1,
                data: existingData,
            });

        } catch (error) {
            console.error('error :>> ', error);
            return res.json({
                success: 0,
                message: error.message,
            });
        }
    },
    getAdminUser: (req, res) => {
        getAdminUser((err, results) => {
            if (err) {
                console.error(err);
                return
            }
            return res.json({
                success: 1,
                message: results,
            })

        })
    },
    updateUserAdmin: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);

        body.admin_password = hashSync(body.admin_password, salt);

        updateUserAdmin(body, (err, results) => {
            if (err) {
                console.error(err);
                return
            }
            if (results.length == 0) {
                return res.json({
                    success: 0,
                    message: "Failed to update!"
                })
            }
            return res.json({
                success: 1,
                message: "Admin updated successfully!"
            })
        })
    },
    deleteAdminUser: (req, res) => {
        const adminId = req.params.id;
        deleteAdminUser(adminId, (err, results) => {
            if (err) {
                console.error(err);
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found!"
                })
            }
            return res.json({
                success: 1,
                message: "Admin user deleted successfully",
            })
        })
    },
    validateAdminUser: async (req, res) => {
        const { admin_username, admin_password } = req.body;

        try {
            req.body.admin_password = md5(admin_password);
            const md5Password = md5(admin_password);
            const admin = await adminUserTable.findOne({ where: { admin_username, admin_password: md5Password, status: '1' }, attributes: ['admin_username', 'channel_id'] });
            if (!!admin) {
                const { channel_id } = admin;
                console.log('channel_id :>> ', channel_id);
                const channelDetails = await channelTable.findOne({ where: { id: channel_id, status: '1' }, attributes: ['name', 'channel_logo', 'description'] })
                if (!!channelDetails) {
                    const updateData = { ...admin.dataValues, channelDetails: channelDetails?.dataValues }
                    if (updateData) {
                        return res.json(apiResponse(true, 'Admin login success!', updateData));
                    }
                }
                return res.json(apiResponse(false, 'Channel is not active', []))
            }
            return res.json(apiResponse(false, 'Wrong admin user details!', []))


        } catch (error) {
            return res.json({
                success: 0,
                message: error.message,
                data: [],
            });
        }
    },
    addUpdateNews: (req, res) => {
        addUpdateNewsService(req.body, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: err,
                    data: []
                })
            }
            return res.json({
                success: 1,
                message: "Data updated successfully",
                data: []
            })
        })
    },
    getNewsListController: (req, res) => {
        getNewsListService(req.body, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: err,
                    data: []
                })
            }
            return res.json({
                success: 1,
                message: "Data fetched successfully",
                data: result
            })
        })
    },
    getChannelMenuListController: (req, res) => {
        getChannelMenuListService(req.body, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: err,
                    data: []
                })
            }
            return res.json({
                success: 1,
                message: "Data fetched successfully",
                data: result
            })
        })
    },
    getNewsDetailsController: (req, res) => {
        getNewsDetailsService(req.body, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: err,
                    data: []
                })
            }
            return res.json({
                success: 1,
                message: "Data fetched successfully",
                data: result
            })
        })
    },
    addUpdateChannel: async (req, res) => {
        try {
            const { file, body } = req;
            const { uuid } = body;
            let whereClause = {}
            if (!!uuid) {
                //update
                delete body.uuid;
                whereClause.uuid = uuid;
                if (!!file) {
                    const LogoPath = `/profile/${file?.filename}`;
                    body.channel_logo = LogoPath
                }
                console.log('body :>> ', body);
                const result = await channelTable.update(body, { where: whereClause });
                if (result[0] > 0) {
                    return res.json(apiResponse(true, 'Channel update successfully!', []))
                }
                return res.json(apiResponse(false, 'Failed to updated channel!'))

            }
            //create
            const reqData = { ...body, channel_logo: LogoPath }
            const createdChannel = await channelTable.create(reqData);
            if (!!createdChannel) {
                return res.json(apiResponse(true, 'Channel created successfully!', createdChannel))
            }
            return res.json(apiResponse(false, 'Failed to create channel!', createdChannel))
        } catch (error) {
            console.error(error);
        }
    }

}
