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
const newsTable = require('./../../models').em_users;
const bussinessTable = require('./../../models').em_bussiness;
const { v4: uuidv4 } = require('uuid');
module.exports = {
    createUserBussiness:async (req, res) => {
        // const body = req.body;
        // const salt = genSaltSync(10);
        // serviceCreateBussiness(body, (err, results) => {
        //     if (err) {
        //         console.error(err);
        //         return res.status(500).json({
        //             success: false,
        //             message: "Database connection error!"
        //         })
        //     }
        //     return res.status(200).json({
        //         success: true,
        //         message: results
        //     })
        // })
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
                 if (!!createdRow) {
                     return res.json(
                         {
                             success: 1,
                             message: "Bussiness Added.",
                         }
                     )
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
                    success: 1,
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

    addNewsController: async (req, res) => {
        try {
            req.body['uuid'] = uuidv4();
            console.log('createdData :>> ',);
            const createdRow = await newsTable.create(req.body);
            console.log('createdRow :>> ', createdRow);
            if (!!createdRow) {
                return res.json(
                    {
                        success: 1,
                        message: "Data has been inserted",
                    }
                )
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
                    success: 1,
                    message: error.message,
                }
            )
        }
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
    },
    updateNewsController: async (req, res) => {
        try {
            console.log('req.body :>> ', req.body);
            const { uuid, bus_email } = req.body;
            if (!!uuid) {
                const updatedRo = await newsTable.update({ bus_email }, {
                    where: {
                        uuid,
                    }
                });
                if (updatedRo > 0) {
                    return res.json(
                        {
                            success: 0,
                            message: "Data has been updated",
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
                    success: 1,
                    message: error.message,
                }
            )
        }
    },


    fetchAllNewsController: async (req, res) => {
        try {
            console.log('req :>> ', req.body);
            const { uuid, id } = req.body;
            if (!!uuid) {
                const newsData = await newsTable.findAll({
                    where: { uuid },
                    attributes: ['first_name', 'last_name']

                })
                return res.json(
                    {
                        success: 1,
                        message: "Data fetched successfully!",
                        data: newsData
                    }
                )
            }
            if (!!id) {
                const newsData = await newsTable.findAll({
                    where: { id }
                })
                return res.json(
                    {
                        success: 1,
                        message: "Data fetched successfully!",
                        data: newsData
                    }
                )
            }
            const newsData = await newsTable.findAll();
            return res.json(
                {
                    success: 1,
                    message: "Data fetched successfully!",
                    data: newsData
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
