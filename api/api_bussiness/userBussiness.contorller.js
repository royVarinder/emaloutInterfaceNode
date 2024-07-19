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
const { v4: uuidv4 } = require('uuid');
module.exports = {
    createUserBussiness:async (req, res) => {
        try {
            const { uuid } = req.body;
                console.log('uuid :>> ', uuid);
             if(!!uuid){
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
             }else{
                 req.body['uuid'] = uuidv4();
                 const createdRow = await bussinessTable.create(req.body);
                 const business_user_data =createdRow?.dataValues;
                business_user_data['uuid_new'] = uuidv4();
                let em_user_req_body={
                    "uuid":business_user_data?.uuid_new,
                    "name":business_user_data?.user_name,
                    "user_business_uuid":business_user_data?.uuid,
                    "user_business_id":business_user_data?.id.toString(),
                    "contact":business_user_data?.user_contact,
                    "email":business_user_data?.user_email,
                    "city":business_user_data?.buss_city,
                    "district":business_user_data?.buss_district
                }
                const em_user_createdRow = await emUserTable.create(em_user_req_body);

                 if (!!createdRow) {

                    if (!!em_user_createdRow){
                        return res.json(
                            {
                                success: 1,
                                message: "Bussiness and business user are Added.",
                            }
                        )
                    }else{
                        return res.json(
                            {
                                success: 1,
                                message: "Bussiness Added.",
                            }
                        )
                    }
                 }
             }
            return res.json(
                {
                    success: 0,
                    message: "Something went wrong!",
                }
            )

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
    getUserBussiness: async(req, res) => {
        // serviceGetBussinesses((err, results) => {
        //     if (err) {
        //         console.error(err);
        //         return
        //     }
        //     return res.json({
        //         success: 1,
        //         message: results,
        //     })

        // })


         try {
            console.log('req :>> ', req.body);
            const { uuid, id } = req.body;
                if (!!uuid) {
                    const bussinessData = await bussinessTable.findAll({
                        where: { uuid }
                    })
                    return res.json(
                        {
                            success: 1,
                            message: "Bussiness fetched successfully!",
                            data: bussinessData
                        }
                    )
                }
                if (!!id) {
                    const bussinessData = await bussinessTable.findAll({
                        where: { id }
                    })
                    return res.json(
                        {
                            success: 1,
                            message: "Bussiness fetched successfully!",
                            data: bussinessData
                        }
                    )
                }
                const bussinessData = await bussinessTable.findAll();
                console.log('bussinessData :>> ', bussinessData);
                return res.json(
                    {
                        success: 1,
                        message: "All Bussiness fetched successfully!",
                        data: bussinessData
                    }
                )
        } catch (error) {
            console.error(error);
            return res.json(
                {
                    success: 1,
                    message: error.message,
                }
            )
        }

    },

    // addNewsController: async (req, res) => {
    //     try {
    //         req.body['uuid'] = uuidv4();
    //         console.log('createdData :>> ',);
    //         const createdRow = await newsTable.create(req.body);
    //         console.log('createdRow :>> ', createdRow);
    //         if (!!createdRow) {
    //             return res.json(
    //                 {
    //                     success: 1,
    //                     message: "Data has been inserted",
    //                 }
    //             )
    //         }
    //         return res.json(
    //             {
    //                 success: 0,
    //                 message: "Something went wrong!",
    //             }
    //         )

    //     } catch (error) {
    //         console.error(error);
    //         return res.json(
    //             {
    //                 success: 1,
    //                 message: error.message,
    //             }
    //         )
    //     }
        // console.log('req.body :>> ', req.body);
        // // res.json({
        // //     success:1,
        // //     message:"Api res succes."
        // // })
        // addNewsService(req.body,(err,results)=>{
        //      if(err){
        //         console.error(err);
        //          return res.json({
        //         success : 0,
        //         message : err.message,
        //     })
        //     }
        //     return res.json({
        //         success : 1,
        //         message : "Data insert successfully.",
        //     })
        // });
    // },
    // updateNewsController: async (req, res) => {
    //     try {
    //         console.log('req.body :>> ', req.body);
    //         const { uuid, bus_email } = req.body;
    //         if (!!uuid) {
    //             const updatedRo = await newsTable.update({ bus_email }, {
    //                 where: {
    //                     uuid,
    //                 }
    //             });
    //             if (updatedRo > 0) {
    //                 return res.json(
    //                     {
    //                         success: 0,
    //                         message: "Data has been updated",
    //                     }
    //                 )
    //             }
    //             return res.json(
    //                 {
    //                     success: 0,
    //                     message: "Something went wrong!",
    //                 }
    //             )


    //         }

    //     } catch (error) {
    //         console.error(error);
    //         return res.json(
    //             {
    //                 success: 1,
    //                 message: error.message,
    //             }
    //         )
    //     }
    // },


    // fetchAllNewsController: async (req, res) => {
    //     try {
    //         console.log('req :>> ', req.body);
    //         const { uuid, id } = req.body;
    //         if (!!uuid) {
    //             const newsData = await newsTable.findAll({
    //                 where: { uuid },
    //                 attributes: ['first_name', 'last_name']

    //             })
    //             return res.json(
    //                 {
    //                     success: 1,
    //                     message: "Data fetched successfully!",
    //                     data: newsData
    //                 }
    //             )
    //         }
    //         if (!!id) {
    //             const newsData = await newsTable.findAll({
    //                 where: { id }
    //             })
    //             return res.json(
    //                 {
    //                     success: 1,
    //                     message: "Data fetched successfully!",
    //                     data: newsData
    //                 }
    //             )
    //         }
    //         const newsData = await newsTable.findAll();
    //         return res.json(
    //             {
    //                 success: 1,
    //                 message: "Data fetched successfully!",
    //                 data: newsData
    //             }
    //         )
    //     } catch (error) {
    //         console.error(error);
    //         return res.json(
    //             {
    //                 success: 1,
    //                 message: error.message,
    //             }
    //         )
    //     }
    // },



    updateNewsByIdController: (req, res) => {

        updateNewsByIdService(req.body, (err, results) => {
            if (err) {
                console.error(err);
                return res.json({
                    success: 0,
                    message: err.message,
                })
            }
            return res.json({
                success: 1,
                message: "Data Update successfully."
            })
        })
    },
    getNewsController: (req, res) => {

        getNewsService(req.body, (err, results) => {
            if (err) {
                console.error('err :>> ', err);
                return res.json({
                    success: 0,
                    message: err.message,
                })
            }
            return res.json({
                success: 1,
                message: "Data fetch successfully."
            })
        })
    },
    deleteNewsByIdController: (req, res) => {
        deleteNewsByIdService(req.body, (err, results) => {
            if (err) {
                console.log('err :>> ', err);
                return res.json({
                    success: 0,
                    message: err.message
                })
            }
            return res.json({
                success: 1,
                message: "Data deleted successfully."
            })
        })

    },
    updateNewsAnyKayByIdController: (req, res) => {
        updateNewsAnyKayByIdService(req.body, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: err.message
                })
            }
            return res.json({
                success: 1,
                message: "Data update for specific key with ID."
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
}
