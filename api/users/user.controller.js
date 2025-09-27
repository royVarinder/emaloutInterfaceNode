const { apiResponse } = require("../../util");
const Session = require("../../models").session;
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const md5 = require("md5");
const emChannel = require("../../models").em_channel;
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { emailSend } = require("../../util");
const userModel = require("../../mongoModels/users");
const { generateToken } = require("../../Config/Util");
const sessionModel = require("../../mongoModels/session");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
    login: async (req, res) => {
        try {
            const { name, phone } = req.body;
            if (!name || !phone) {
                return res.status(400).json(apiResponse(false, "Name and phone are required", []));
            }
            const expiresIn = '1d'; // JWT expiration
            const expiresAt = dayjs().add(1, 'day').toDate();

            const token = jwt.sign(
                { name, phone },
                process.env.JWT_SECRET,
                { expiresIn } // 1 day
            );

            const session = await Session.create({
                name,
                phone,
                session_key: token,
                expiresAt,
                session_type: 'user',
            });

            return res.status(200).json(apiResponse(true, "User created successfully", [
                {
                    name,
                    phone,
                    token,
                    expiresAt,
                }
            ]));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []))
        }
    },

    logout: async (req, res) => {
        try {
            const { token } = req.headers;
            if (!token) {
                return res.status(400).json(apiResponse(false, "Token is required", []));
            }
            //destroy the token
            const session = await Session.findOne({ where: { session_key: token, status: 1, } });
            if (!session) {
                return res.status(400).json(apiResponse(false, "Session not found", []));
            }
            await Session.destroy({ where: { session_key: token } });
            return res.status(200).json(apiResponse(true, "User logged out successfully"));
        } catch (error) {
            ``
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []))
        }
    },
    profile: async (req, res) => {
        try {
            const { user } = req;
            return res.status(200).json(apiResponse(true, "User profile", [user]));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []))
        }
    },
    registerChannel: async (req, res) => {
        try {
            const file = req.file;
            //genrate a random password without uuid
            const password = Math.random().toString(36).substring(2, 10);
            const encryptedPassword = md5(password);
            if (!file) {
                return res.status(400).json(apiResponse(false, "Channel logo is required", []));
            }
            const channelLogo = await cloudinary.uploader.upload(file.path, {
                folder: "em_channels",
                // resource_type: "auto"
            })
            //delete the file from the server
            fs.unlinkSync(file.path);
            req.body.logo = channelLogo?.url;
            req.body.password = encryptedPassword;
            const channel = await emChannel.create(req.body);
            const email = await emailSend(req.body.email, "Channel created successfully", `Your password is ${password}`);
            return res.status(200).json(apiResponse(true, "Channel created successfully", [channel]));

        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []))
        }
    },
    loginChannel: async (req, res) => {
        try {
            const { email, password } = req.body;
            const channel = await emChannel.findOne({ where: { email, password: md5(password) } });
            //genrrate a jwt token
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '1d' });
            const session = await Session.create({
                name: channel.name,
                email,
                password,
                session_key: token,
                expiresAt: dayjs().add(1, 'day').toDate(),
                session_type: 'channel',
            });

            if (!channel) {
                return res.status(400).json(apiResponse(false, "Invalid email or password", [[]]));
            }
            return res.status(200).json(apiResponse(true, "Channel logged in successfully", [{
                channel,
                token,
                expiresAt: dayjs().add(1, 'day').toDate(),
            }]));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []))
        }
    },
    logoutChannel: async (req, res) => {
        try {
            const { token } = req.headers;
            if (!token) {
                return res.status(400).json(apiResponse(false, "Token is required", []));
            }
            const session = await Session.findOne({ where: { session_key: token, session_type: 'channel' } });
            if (!session) {
                return res.status(400).json(apiResponse(false, "Session not found", []));
            }
            await Session.destroy({ where: { session_key: token } });
            return res.status(200).json(apiResponse(true, "Channel logged out successfully"));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []))
        }
    },
    registerUser: async (req, res) => {
        const { phone, name } = req.body;

        if (!phone || !name) {
            return res.status(400).apiResponse(false, "Phone and Name are required", []);
        }

        try {
            // Check if user exists
            let user = await userModel.findOne({ phone });

            if (!user) {
                // Register new user
                user = new userModel({ name, phone });
                await user.save();
            }

            // Generate JWT
            //expire token in 1 minutes
            const token = generateToken({ id: user._id, name: user.name, phone: user.phone }, '7d');
            //save in session
            const session = new sessionModel({
                user: user._id,
                token,
                expiredAt: dayjs().add(7, 'day').toDate(),
            });
            await session.save();
            return res.status(200).json(apiResponse(true, "Login successful", { id: user._id, name: user.name, phone: user.phone, token }));
        } catch (err) {
            console.error(err);
            return res.status(500).json(apiResponse(false, "Server error", []));
        }
    },
    logoutUser: async (req, res) => {
        try {
            if (!req.headers.token) {
                return res.status(400).json(apiResponse(false, "Token is required", []));
            }
            await sessionModel.deleteOne({ token: req.headers.token });
            return res.status(200).json(apiResponse(true, "Logout successful"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }

    },
    adminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const admin = await adminUserTable.findOne({ where: { adsmin_username, admin_password: md5(admin_password) } });
            if (!admin) {
                return res.status(400).json(apiResponse(false, "Invalid admin username or password", []));
            }
            return res.status(200).json(apiResponse(true, "Admin login successful", admin));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    registerAdmin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const admin = await adminUserTable.create({ email, password });
            return res.status(200).json(apiResponse(true, "Admin registered successfully", admin));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    }
}