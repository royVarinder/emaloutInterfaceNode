const {
    serviceCreateNews,
    serviceGetNews,
    //   serviceDeleteBussiness,
    //    serviceUpdateBussiness,
    serviceGetNewsById } = require("./news.service");
const { genSaltSync, hashSync } = require('bcrypt');
const newsTable = require('./../../models').em_news;
const { v4: uuidv4 } = require('uuid');
const { apiResponse, uploadFile } = require("../../util");
const XLSX = require('xlsx');
const appMedia = require("../../models").app_media;
const cloudinary = require('cloudinary').v2;
const fs = require("fs")
const newsCommentTable = require("../../models").em_news_comments;
const { emailSend } = require("../../util");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
module.exports = {
    fetchNewsFromExcel: async (req, res) => {
        try {
            const workbook = XLSX.readFile(req.file.path);
            const sheetName = workbook.SheetNames[0];
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            const updatedData = data.map(item => ({
                uuid: uuidv4(),
                status: "1",
                title: item.title,
                description: item.description,
                author_name: item.author_name,
                facebook_link: item.facebook_link || '',
                insta_link: item.insta_link || '',
                youtube_link: item.youtube_link || '',
                channel_id: item.channel_id || '',
                files: item.files || '',
                createdAt: new Date(),
                updatedAt: new Date()
            }));
            const newsData = await newsTable.bulkCreate(updatedData);
            if (!!newsData) {
                return res.json(apiResponse(true, 'News added successfully!', newsData))
            }
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []))
        }
    },

    addNews: async (req, res) => {
        try {
            req.body['uuid'] = uuidv4();
            let files = uuidv4();
            let filesArray = [];
            if (req.files.length > 0) {
                const uploadPromises = req?.files?.map((file) => {
                    return cloudinary.uploader.upload(file.path, {
                        folder: "em_news",
                        // resource_type: "auto"
                    }).then(result => {
                        // Delete local file after upload
                        fs.unlinkSync(file.path);
                        return result.secure_url;
                    });
                });
                filesArray = await Promise.all(uploadPromises);
            }
            if (filesArray.length > 0) {
                filesArray = filesArray?.map(file => {
                    return {
                        uuid: files,
                        url: file,
                        table_name: 'em_news',
                        status: '1'
                    }
                })
            } else {
                return res.status(400).json(apiResponse(false, 'Failed to upload files', []))
            }
            await appMedia.bulkCreate(filesArray);
            req.body['files'] = files;
            const createdRow = await newsTable.create(req.body);
            if (!!createdRow) {
                await emailSend(process.env.ADMIN_EMAIL, "News added successfully!", `
                    News added successfully!
                    News Title: ${createdRow.title}
                    News Description: ${createdRow.description}
                    News Author: ${createdRow.author_name}
                    News Date: ${createdRow.createdAt}
                    !`);
                return res.json(apiResponse(true, 'News added successfully!', createdRow))
            }
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []))
        }
    },
    updateNews: async (req, res) => {
        try {
            const { uuid } = req.body;
            if (!!uuid) {
                await newsTable.update(req.body, {
                    where: {
                        uuid,
                    }
                });
                return res.status(200).json(apiResponse(true, 'News updated successfully', []))
            }
            return res.status(400).json(apiResponse(false, 'Failed to update news', []))
        } catch (error) {
            console.error(error);
            return res.json(
                {
                    success: 0,
                    message: error.message,
                }
            )
        }
    },


    //WITH UUID, ALL NEWS, channel_id
    getNewsController: async (req, res) => {
        try {
            const { channel_id, uuid, limit = 40, offset = 0 } = req.body;
            console.log(' req.body :>> ',  req.body);
            let whereClause = {}
            if (channel_id) {
                whereClause = { channel_id, status: "1" }
            }
            if (uuid) {
                whereClause = { uuid, status: "1" }
            }
            console.log('whereClause :>> ', whereClause);
            const fetchedNews = await newsTable.findAll({
                where: whereClause,
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: newsCommentTable,
                        as: 'news_comments',
                    },
                    {
                        model: appMedia,
                        as: 'news_media',
                    }
                ]
            })

            // const fetchedNewsWithMedia = await Promise.all(fetchedNews.map(async (news) => {
            //     const media = await appMedia.findAll({ where: { table_name: 'em_news', uuid: news.files, status: "1" } })
            //     return { ...news?.dataValues, media }
            // }))
            if (!!fetchedNews) {
                return res.status(200).json(apiResponse(true, 'News fetched successfully!', fetchedNews))
            }
            return res.status(400).json(apiResponse(false, 'Failed to fetch news', []))
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []))
        }
    },

    //comments
    addComment: async (req, res) => {
        try {
            const { news_id, comment, name } = req.body;
            const commentData = await newsCommentTable.create({
                news_id,
                comment,
            });
            if (!!commentData) {
                return res.status(200).json(apiResponse(true, 'Comment added successfully!', commentData))
            }
            return res.status(400).json(apiResponse(false, 'Failed to add comment', []))
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []))
        }
    },

    getComments: async (req, res) => {
        try {
            const { news_id } = req.body;
            const comments = await newsCommentTable.findAll({
                where: { news_id },
                order: [['createdAt', 'DESC']]
            });
            return res.status(200).json(apiResponse(true, 'Comments fetched successfully!', comments))
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []))
        }
    },

    updateComment: async (req, res) => {
        try {
            const { id, comment } = req.body;
            if (!id) {
                return res.status(400).json(apiResponse(false, 'Comment ID is required', []))
            }
            await newsCommentTable.update(
                { comment },
                { where: { id } }
            );
            return res.status(200).json(apiResponse(true, 'Comment updated successfully!', []))
        } catch (error) {
            console.error(error);
            return res.status(500).json(apiResponse(false, error.message, []))
        }
    }
}
