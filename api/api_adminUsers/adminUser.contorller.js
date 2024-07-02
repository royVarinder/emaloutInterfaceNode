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
    validateAdminUser: async (req, res) => {
         const { admin_username, admin_password } = req.body;

         try {
            req.body.admin_password = md5(admin_password);
            const md5Password =md5(admin_password);
            const admin = await adminUserTable.findOne({ where: { admin_username,admin_password: md5Password  } });
        if (!admin) {
            return res.json({
                success: 0,
                message: "Authentication failed. User not found.",
            });
        }
        return res.json({
            success: 1,
            message: "Authentication successful.",
        });

    } catch (error) {
        console.error('Authentication error :>> ', error);
        return res.json({
            success: 0,
            message: error.message,
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
    }

}
