//function to print current time stamp 
const moment = require('moment');
const FORMAT = "DD-MM-YYYY hh:mm A";
const jwt = require('jsonwebtoken');
const { apiResponse } = require('../util');
const sessionModel = require('../mongoModels/session');
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

    }

}