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
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.admin_password = hashSync(body.admin_password, salt);
        create(body, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                })
            }
            return res.status(200).json({
                success: 1,
                message: results
            })
        })
    },
    getAdminUserById: (req, res) => {
        const adminId = req.params.id;
        getAdminUserById(adminId, (err, results) => {
            if (err) {
                console.error(err);
                return
            }
            if (results.length === 0) {
                return res.json({
                    success: 0,
                    message: "Record not found!"
                })
            }
            return res.json({
                success: 1,
                message: results,
            })
        })
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
