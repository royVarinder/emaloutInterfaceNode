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
const sessionModel = require("../../mongoModels/session");

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

    // SUPER ADMIN: USER MANAGEMENT =====>

    // List all users with a flag showing whether they currently have an active (non-expired) session.
    listAllUsers: async (req, res) => {
        try {
            const page = Math.max(parseInt(req.body.page, 10) || 1, 1);
            const limit = Math.max(parseInt(req.body.limit, 10) || 50, 1);

            const [users, total, activeSessions] = await Promise.all([
                userModel.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
                userModel.countDocuments({}),
                sessionModel.find({ user: { $ne: null }, expiredAt: { $gt: new Date() } }).select('user').lean(),
            ]);

            const activeUserIds = new Set(activeSessions.map((s) => String(s.user)));
            const usersWithSessionFlag = users.map((user) => ({
                ...user,
                isSessionActive: activeUserIds.has(String(user._id)),
            }));

            return res.json(apiResponse(true, "Users fetched successfully", {
                users: usersWithSessionFlag,
                total,
                page,
                limit,
            }));
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []));
        }
    },

    // Force-logout a user: deletes all of their active sessions.
    logoutUserSession: async (req, res) => {
        try {
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json(apiResponse(false, "userId is required", []));
            }
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).json(apiResponse(false, "User not found", []));
            }
            const result = await sessionModel.deleteMany({ user: userId });
            return res.json(apiResponse(true, "User logged out successfully", {
                userId,
                sessionsRemoved: result.deletedCount,
            }));
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []));
        }
    },

    // Disable a user (status = 0) and kill their active session(s).
    disableUser: async (req, res) => {
        try {
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json(apiResponse(false, "userId is required", []));
            }
            const user = await userModel.findByIdAndUpdate(
                userId,
                { status: 0, updatedAt: new Date() },
                { new: true }
            );
            if (!user) {
                return res.status(404).json(apiResponse(false, "User not found", []));
            }
            await sessionModel.deleteMany({ user: userId });
            return res.json(apiResponse(true, "User disabled successfully", user));
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []));
        }
    },

    // Soft-delete a user (status = -1) and kill their active session(s).
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json(apiResponse(false, "userId is required", []));
            }
            const user = await userModel.findByIdAndUpdate(
                userId,
                { status: -1, updatedAt: new Date() },
                { new: true }
            );
            if (!user) {
                return res.status(404).json(apiResponse(false, "User not found", []));
            }
            await sessionModel.deleteMany({ user: userId });
            return res.json(apiResponse(true, "User deleted successfully", user));
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []));
        }
    },

}
