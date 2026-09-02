//function to print current time stamp 
const moment = require('moment');
const FORMAT = "DD-MM-YYYY hh:mm A";
const jwt = require('jsonwebtoken');
const { apiResponse } = require('../util');
const sessionModel = require('../mongoModels/session');
const adminUsersModel = require('../mongoModels/adminUsers');
const dayjs = require('dayjs');

module.exports = {
    printCurrentTimeStamp: () => {
        const _moment = moment();
        return _moment.format(FORMAT);
    },
    generateToken: (payload, expiresIn = '7d') => {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
    },
    verifyToken: async (req, res, next) => {
        try {
            const session = await sessionModel.findOne({ token: req.headers.token });
            if (!session) {
                return res.status(401).json(apiResponse(false, "Token not found", []));
            }
            if (dayjs().isAfter(dayjs(session.expiredAt))) {
                return res.status(401).json(apiResponse(false, "Token expired", []));
            }
            req.user = session.user;
            return next();
        } catch (error) {
            console.log(error);
            return res.status(401).json(apiResponse(false, 'Invalid token', []));
        }

    },

    // Gate for super-admin-only endpoints (user management: list/logout/disable/delete).
    // Requires the `token` header to resolve to a Session whose `admin` ref is an
    // AdminUsers doc with role === 'superadmin'.
    verifySuperAdmin: async (req, res, next) => {
        try {
            const token = req.headers.token;
            if (!token) {
                return res.status(401).json(apiResponse(false, "Token not found", []));
            }
            const session = await sessionModel.findOne({ token });
            if (!session) {
                return res.status(401).json(apiResponse(false, "Token not found", []));
            }
            if (dayjs().isAfter(dayjs(session.expiredAt))) {
                return res.status(401).json(apiResponse(false, "Token expired", []));
            }
            if (!session.admin) {
                return res.status(403).json(apiResponse(false, "Admin access required", []));
            }
            const admin = await adminUsersModel.findById(session.admin);
            if (!admin || admin.status !== 1) {
                return res.status(401).json(apiResponse(false, "Invalid admin session", []));
            }
            if (admin.role !== 'superadmin') {
                return res.status(403).json(apiResponse(false, "Superadmin access required", []));
            }
            req.admin = admin;
            return next();
        } catch (error) {
            console.log(error);
            return res.status(401).json(apiResponse(false, 'Invalid token', []));
        }
    }

}