const md5 = require("md5");
const channelModel = require("../../mongoModels/channel");
const newsModel = require("../../mongoModels/news");
const { apiResponse, uploadFile, emailSend } = require("../../util");

module.exports = {

    createChannel: async (req, res) => {
        try {
            if (req.files.length > 0) {
                const fileData = await uploadFile(req.files, "channels");
                req.body.logo = fileData[0];
            }
            //genrate a random password without uuid
            const password = Math.random().toString(36).substring(2, 10);
            req.body.password = md5(password);
            const channel = await channelModel.create(req.body);
            await emailSend(`${process.env.ADMIN_EMAIL}, ${channel.email}`, "New Channel Registered!", `
                New Channel Registered!
                Channel Name: ${channel.name}
                Channel Email: ${channel.email}
                Channel Password: ${password}
                Channel Date: ${channel.createdAt}
                Channel Address: ${channel.address}
                Channel Phone: ${channel.phone}
                !`);
            return res.status(200).json(apiResponse(true, "Channel created successfully", channel));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    updateChannel: async (req, res) => {
        try {
            if (req?.body?.channel_id) {
                if (req?.files?.length > 0) {
                    const fileData = await uploadFile(req?.files, "channels");
                    req.body.logo = fileData[0];
                }
                await channelModel.findByIdAndUpdate(req?.body?.channel_id, req?.body, { new: true });
                return res.status(200).json(apiResponse(true, "Channel updated successfully", []));
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    getChannel: async (req, res) => {
        try {
            if (req?.body?.channel_id) {
                const channel = await channelModel.findById(req?.body?.channel_id);
                return res.status(200).json(apiResponse(true, "Channel fetched successfully", channel));
            }
            if (req?.body?.user) {
                const channel = await channelModel.findById(req?.body?.user);
                return res.status(200).json(apiResponse(true, "Channel fetched successfully", channel));
            }
            const channel = await channelModel.find();
            return res.status(200).json(apiResponse(true, "Channel fetched successfully", channel));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    createNews: async (req, res) => {
        try {
            if (req.files.length > 0) {
                const fileData = await uploadFile(req.files, "news");
                req.body.files = fileData;
            }
            const news = await newsModel.create(req.body);
            return res.status(200).json(apiResponse(true, "News created successfully", news));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    updateNews: async (req, res) => {
        try {
            if (!req?.body?.news_id) {
                return res.status(400).json(apiResponse(false, "News id is required", []));
            }
            const existingFiles = await newsModel.findById(req?.body?.news_id);
            if (req?.files?.length > 0) {
                const fileData = await uploadFile(req?.files, "news");
                req.body.files = fileData;
                req.body.files = [...existingFiles?.files, ...fileData];
            }
            console.log('req.body :>> ', req.body);
            const news = await newsModel.findByIdAndUpdate(req?.body?.news_id, req?.body, { new: true });
            return res.status(200).json(apiResponse(true, "News updated successfully", news));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    getNews: async (req, res) => {
        try {
            if (req?.body?.news_id) {
                const news = await newsModel.find({ _id: req?.body?.news_id, status: 1 });
                return res.status(200).json(apiResponse(true, "News fetched successfully", news));
            }
            if (req?.body?.channel) {
                const news = await newsModel.find({ channel: req?.body?.channel, status: 1 });
                return res.status(200).json(apiResponse(true, "News fetched successfully", news));
            }
            if (req?.body?.user) {
                const news = await newsModel.find({ user: req?.body?.user, status: 1 });
                return res.status(200).json(apiResponse(true, "News fetched successfully", news));
            }
            const news = await newsModel.find({ status: 1 });
            return res.status(200).json(apiResponse(true, "News fetched successfully", news));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    }
}