const {
    serviceCreateNews,
    serviceGetNews,
    //   serviceDeleteBussiness,
    //    serviceUpdateBussiness,
    serviceGetNewsById } = require("./news.service");
const { genSaltSync, hashSync } = require('bcrypt');
const newsTable = require('./../../models').em_news;
const { v4: uuidv4 } = require('uuid');
const { apiResponse } = require("../../util");

module.exports = {
    createUserBussiness: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        serviceCreateBussiness(body, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: "Database connection error!"
                })
            }
            return res.status(200).json({
                success: true,
                message: results
            })
        })
    },
    getUserBussinessById: (req, res) => {
        const bussId = req.params.id;
        serviceGetBussinessById(bussId, (err, results) => {
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
    getUserBussiness: (req, res) => {
        serviceGetBussinesses((err, results) => {
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
    // updateUserBussiness : (req, res)=>{
    //     const body = req.body;
    //     const salt = genSaltSync(10);

    //     body.admin_password = hashSync(body.admin_password, salt);

    //     serviceUpdateBussiness(body, (err, results)=>{
    //         if(err){
    //             console.error(err);
    //             return
    //         }
    //         if(results.length == 0){
    //             return res.json({
    //                 success  : 0,
    //                 message: "Failed to update!"
    //             })
    //         }
    //         return res.json({
    //             success : 1,
    //             message : "Admin updated successfully!"
    //         })  
    //     })
    // },
    // deleteBussinessById : (req, res)=>{
    //     const adminId = req.params.id;
    //     serviceDeleteBussiness(adminId, (err,results)=>{
    //         if(err){
    //             console.error(err);
    //             return
    //         }
    //         if(!results) {
    //             return res.json({
    //                 success : 0,
    //                 message : "Record not found!"
    //             })
    //         }
    //         return res.json({
    //             success : 1,
    //             message : "Admin user deleted successfully",
    //         })
    //     })
    // },
    addNews: async (req, res) => {
        try {
            req.body['uuid'] = uuidv4();
            const filesPath = req.files?.map((file) => `profile/${file.filename}`)
            req.body.files = filesPath.join("|")
            const createdRow = await newsTable.create(req.body);
            if (!!createdRow) {
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
                const updatedRo = await newsTable.update(req.body, {
                    where: {
                        uuid,
                    }
                });
                if (updatedRo > 0) {
                    return res.json(
                        {
                            success: 1,
                            message: "News updated",
                        }
                    )
                }
                return res.json(
                    {
                        success: 0,
                        message: "Something went wrong!",
                    }
                )
            }
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

    getNewsByUuid: async (req, res) => {
        try {
            const { uuid } = req.body;

            if (!uuid) {
                return res.json({
                    success: 0,
                    message: "UUID is required.",
                });
            }

            const findNews = await newsTable.findOne({ where: { uuid } });

            if (findNews) {
                return res.json({
                    success: 1,
                    message: findNews,
                });
            }

            return res.json({
                success: 0,
                message: "News not found!",
            });

        } catch (error) {
            console.error(error);
            return res.json({
                success: 0,
                message: error.message,
            });
        }
    },

}
