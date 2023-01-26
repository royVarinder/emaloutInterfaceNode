const {
    serviceCreateBussiness,
     serviceGetBussinesses,
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
