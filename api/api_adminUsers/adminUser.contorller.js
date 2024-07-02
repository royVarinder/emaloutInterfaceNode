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
module.exports = {
    createUser: async (req, res) => {
        try {
            const { admin_password } = req.body;
            req.body.admin_password = md5(admin_password);
            req.body['uuid'] = uuidv4();
            const createdAdminUser = await adminUserTable.create(req.body);
            if (!!createdAdminUser) {
                return res.json({
                    success: true,
                    message: "Admin user created successfully!",
                    data: [],
                })
            }
            return res.json({
                success: false,
                message: "Failed to create admin user!",
                data: [],
            })
        } catch (error) {
            console.error(error);
            return res.json({
                success: false,
                message: error?.message,
                data: [],
            })
        }
    },
    getAdminUserById:async (req, res) => {
        try {
        console.log('req.body :>> ', req.body);
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
    validateAdminUser: (req, res) => {
        validateAdminUserService(req?.body, (err, adminResult) => {
            if (err) {
                console.error(err);
                return
            }
            if (adminResult.length === 0) {
                return res.json({
                    success: 0,
                    message: "Invalid Credentials!",
                    data: [],
                    channel: undefined
                })
            }
            const adminId = adminResult[0]?.id;
            getChannelDetailsService(adminId, (err, channelResult) => {
                let _channelDetail = channelResult[0] || null;
                if (_channelDetail) {
                    _channelDetail['channel_id'] = _channelDetail?.id
                }
                if (err) {
                    console.error(err.message);
                    return
                }
                return res.json({
                    success: 1,
                    message: "Admin user logged in successfully",
                    data: adminResult,
                    channel: channelResult,
                })
            })

        })
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
    }

}
