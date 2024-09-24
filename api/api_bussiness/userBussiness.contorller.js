const {
    serviceCreateBussiness,
    serviceGetBussinesses,
    addNewsService,
    updateNewsByIdService,
    getNewsService,
    deleteNewsByIdService,
    updateNewsAnyKayByIdService,
    //   serviceDeleteBussiness,
    //    serviceUpdateBussiness,
    serviceGetBussinessById } = require("./userBussiness.service");
const { genSaltSync, hashSync } = require('bcrypt');
// const newsTable = require('./../../models').em_users;
const emUserTable = require('./../../models').em_users;
const bussinessTable = require('./../../models').em_bussiness;
const categoryTable = require('./../../models').em_category;
const newsTable = require('./../../models').em_news;
const { v4: uuidv4 } = require('uuid');
const { apiResponse } = require("../../util");
const em_category = require("../../models/em_category");
module.exports = {
    createUserBussiness: async (req, res) => {
        try {
            const { files, body } = req;
            const { uuid } = body;
            console.log('body :>> ', body);
            // return;
            let filesUrls = []
            if (files.length > 0) {
                filesUrls = files.map((items) => {
                    return `/profile/${items.filename}`
                })
            }

            if (!!uuid) {
                const updatedRo = await bussinessTable.update(req.body, {
                    where: {
                        uuid,
                    }
                });
                if (updatedRo > 0) {
                    return res.json(
                        {
                            success: 1,
                            message: "Bussiness updated",
                        }
                    )
                }
            } else {
                body['buss_images'] = !!filesUrls ? filesUrls.join("|") : ""
                const createdRow = await bussinessTable.create(req.body);
                const business_user_data = createdRow?.dataValues;
                let em_user_req_body = {
                    "uuid": uuidv4(),
                    "name": business_user_data?.user_name,
                    "user_business_uuid": business_user_data?.uuid,
                    "user_business_id": business_user_data?.id.toString(),
                    "contact": business_user_data?.user_contact,
                    "email": business_user_data?.user_email,
                    "city": business_user_data?.buss_city,
                    "district": business_user_data?.buss_district
                }
                const em_user_createdRow = await emUserTable.create(em_user_req_body);

                if (!!createdRow) {

                    if (!!em_user_createdRow) {
                        return res.json(apiResponse(true, 'Business created successfully!', createdRow))
                    } else {
                        return res.json(apiResponse(false, 'Failed to create business!', []))
                    }
                }
            }
            return res.json(apiResponse(false, 'Something went wrong!', []))


        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []))

        }
    },
    getUserBussinessById: (req, res) => {

    },
    getUserBussiness: async (req, res) => {
        try {
            const { uuid, id } = req.body;
            if (!!uuid) {
                const businessData = await bussinessTable.findAll({
                    where: { uuid, status: '1' }
                })
                const categoryIds = businessData.map((bus) => bus.category_id);
                const categoryDetails = await categoryTable.findAll({
                    where: {
                        id: categoryIds,
                        status: "1"
                    }
                });
                const updateBusinessData = businessData.map((items) => {
                    const dataValues = items?.dataValues;
                    return { ...dataValues, categoryDetails: categoryDetails.find((cate) => cate.id == dataValues.category_id) }
                })

                return res.json(apiResponse(true, 'Business fetched successfully!', updateBusinessData))
            }
            if (!!id) {
                const businessData = await bussinessTable.findAll({
                    where: { id, status: 1 }
                })
                const categoryIds = businessData.map((bus) => bus.category_id);
                const categoryDetails = await categoryTable.findAll({
                    where: {
                        id: categoryIds,
                        status: "1"
                    }
                });
                const updateBusinessData = businessData.map((items) => {
                    const dataValues = items?.dataValues;
                    return { ...dataValues, categoryDetails: categoryDetails.find((cate) => cate.id == dataValues.category_id) }
                })
                return res.json(apiResponse(true, 'Business fetched successfully!', updateBusinessData))
            }
            const businessData = await bussinessTable.findAll();
            //get categories id 
            const categoryIds = businessData.map((bus) => bus.category_id);
            const categoryDetails = await categoryTable.findAll({
                where: {
                    id: categoryIds,
                    status: "1"
                }
            });
            const newCategoryArray = categoryDetails.map((cat) => cat.dataValues);
            const updateBusinessData = newCategoryArray.map((items) => {
                return { ...items, busDetails: businessData.filter((cate) => cate.category_id == items?.id) || {} }
            })
            return res.json(apiResponse(true, 'All business fetched successfully', updateBusinessData))
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []))
        }

    },




    updateNewsByIdController: (req, res) => {

        // updateNewsByIdService(req.body, (err, results) => {
        //     if (err) {
        //         console.error(err);
        //         return res.json({
        //             success: 0,
        //             message: err.message,
        //         })
        //     }
        //     return res.json({
        //         success: 1,
        //         message: "Data Update successfully."
        //     })
        // })
    },
    getNewsController: async (req, res) => {
        try {
            const { limit, offset, channel_id } = req.body;
            let whereClause = {}
            if (channel_id) {
                whereClause = { channel_id }
            }
            const fetchedNews = await newsTable.findAll({ where: whereClause })
            if (!!fetchedNews) {
                return res.json(apiResponse(true, 'News fetched successfully!', fetchedNews))
            }
            return res.json(apiResponse(false, 'Failed to fetch news', []))
        } catch (error) {
            console.error(error);
            res.json(apiResponse(false, error.message, []))
        }
    },
    deleteNewsByIdController: (req, res) => {
        // deleteNewsByIdService(req.body, (err, results) => {
        //     if (err) {
        //         console.log('err :>> ', err);
        //         return res.json({
        //             success: 0,
        //             message: err.message
        //         })
        //     }
        //     return res.json({
        //         success: 1,
        //         message: "Data deleted successfully."
        //     })
        // })

    },
    updateNewsAnyKayByIdController: (req, res) => {
        // updateNewsAnyKayByIdService(req.body, (err, result) => {
        //     if (err) {
        //         return res.json({
        //             success: 0,
        //             message: err.message
        //         })
        //     }
        //     return res.json({
        //         success: 1,
        //         message: "Data update for specific key with ID."
        //     })
        // })

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
}
