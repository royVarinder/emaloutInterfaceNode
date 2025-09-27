const jwt = require('jsonwebtoken');
const Session = require('../models').session;
const { apiResponse } = require('../util');
const dayjs = require('dayjs');

module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            const authHeader = req.headers['token'];
            if (!authHeader) {
                return res.status(401).json(apiResponse(false, "No token provided", []));
            }
            const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
            const session = await Session.findOne({ where: { session_key: authHeader, status: 1 } });
            if (!session) {
                return res.status(401).json(apiResponse(false, "Invalid token", []));
            }
            if (dayjs().isAfter(dayjs(session.expiresAt))) {
                return res.status(401).json(apiResponse(false, "Token expired", []));
            }
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json(apiResponse(false, error.message, []));
        }
    }
}

