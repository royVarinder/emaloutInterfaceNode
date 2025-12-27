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
            console.log('req.body :>> ', req.body);
            const news = await newsModel.create(req.body);
            return res.status(200).json(apiResponse(true, "News created successfully", news));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    updateNews: async (req, res) => {
        try {
            const deletedImages = req?.body?.deletedImages?.split(",");
            if (!req?.body?.news_id) {
                return res.status(400).json(apiResponse(false, "News id is required", []));
            }
            let remainingFiles = [];
            const existingFiles = await newsModel.findById(req?.body?.news_id);
            if (deletedImages?.length > 0) {
                remainingFiles = existingFiles?.files?.filter(file => !deletedImages.includes(file));
                req.body.files = remainingFiles;
            }
            if (req?.files?.length > 0) {
                const fileData = await uploadFile(req?.files, "news");
                req.body.files = [...remainingFiles, ...fileData];
            }
            const news = await newsModel.findByIdAndUpdate(req?.body?.news_id, req?.body, { new: true });
            return res.status(200).json(apiResponse(true, "News updated successfully", news));
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    getNews: async (req, res) => {
        try {
            console.log('req?.body :>> ', req?.body);
            const page = parseInt(req.body.page) || 1;
            const limit = parseInt(req.body.limit) || 10;
            const skip = (page - 1) * limit;
            let query = {};
           
            if (req?.body?.news_id) {
                query = { _id: req?.body?.news_id };
            } 
            if (req?.body?.channel_id) {
                query = { channel: req?.body?.channel_id };
            } 
            if (req?.body?.user) {
                query = { user: req?.body?.user };
            }
            if (req.body.admin) {
                query = { ...query, status: 1 };
            } else {
                query = { ...query, status: 1, disable: 0 };
            }
            console.log('query :>> ', query);
            let news = await newsModel
                .find(query)
                .populate('channel')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            return res.status(200).json(
                apiResponse(true, "News fetched successfully", news)
            );

        } catch (error) {
            console.error(error);
            return res.status(500).json(
                apiResponse(false, error.message, { returndata: [] })
            );
        }
    }



} 