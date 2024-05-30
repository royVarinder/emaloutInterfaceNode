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
        serviceGetBussinessById} = require("./userBussiness.service");
const {genSaltSync, hashSync} = require('bcrypt');
module.exports = {
    createUserBussiness : (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        serviceCreateBussiness(body, (err, results)=>{
            if(err){
                console.error(err);
                return res.status(500).json({
                    success : false,
                    message : "Database connection error!"
                })
            }
            return res.status(200).json({
                success : true,
                message : results
            })  
        })
    },
    getUserBussinessById : (req, res)=>{
        const bussId = req.params.id;
        serviceGetBussinessById(bussId, (err, results)=>{
            if(err){
                console.error(err);
                return 
            }
            if(results.length === 0) {
                return res.json({
                    success : 0,
                    message : "Record not found!"
                })
            }
            return res.json({
                success : 1,
                message : results,
            })
        })
    },
    getUserBussiness : (req,res)=>{
        serviceGetBussinesses((err, results)=>{
            if(err){
                console.error(err);
                return 
            }
            return res.json({
                success : 1,
                message : results,
            })
            
        })
    },

    addNewsController : (req,res)=>{
        console.log('req.body :>> ', req.body);
        // res.json({
        //     success:1,
        //     message:"Api res succes."
        // })
        addNewsService(req.body,(err,results)=>{
             if(err){
                console.error(err);
                 return res.json({
                success : 0,
                message : err.message,
            })
            }
            return res.json({
                success : 1,
                message : "Data insert successfully.",
            })
        });
    },

    updateNewsByIdController:(req,res)=>{

        updateNewsByIdService(req.body,(err,results)=>{
            if(err){
                console.error(err);
                return res.json({
                    success:0,
                    message:err.message,
                })
            }
            return res.json({
                success:1,
                message:"Data Update successfully."
            })
        })
    },
    getNewsController:(req,res)=>{

        getNewsService(req.body,(err,results)=>{
            if(err){
                console.error('err :>> ', err);
                return res.json({
                    success:0,
                    message:err.message,
                })
            }
            return res.json({
                success:1,
                message:"Data fetch successfully."
            })
        })
    },
    deleteNewsByIdController:(req,res)=>{
        deleteNewsByIdService(req.body,(err,results)=>{
            if(err){
                console.log('err :>> ', err);
                return res.json({
                    success:0,
                    message:err.message
                })
            }
            return res.json({
                success:1,
                message:"Data deleted successfully."
            })
        })

    },
    updateNewsAnyKayByIdController:(req,res)=>{
        updateNewsAnyKayByIdService(req.body,(err,result)=>{
            if(err){
                return res.json({
                    success:0,
                    message:err.message
                })
            }
            return res.json({
                success:1,
                message:"Data update for specific key with ID."
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
