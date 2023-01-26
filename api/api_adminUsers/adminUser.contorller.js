const {create, getAdminUser, deleteAdminUser, updateUserAdmin, getAdminUserById} = require("./adminUser.service");
const {genSaltSync, hashSync} = require('bcrypt');
module.exports = {
    createUser : (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.admin_password = hashSync(body.admin_password, salt);
        create(body, (err, results)=>{
            if(err){
                console.error(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error!"
                })
            }
            return res.status(200).json({
                success : 1,
                message : results
            })  
        })
    },
    getAdminUserById : (req, res)=>{
        const adminId = req.params.id;
        getAdminUserById(adminId, (err, results)=>{
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
    getAdminUser : (req,res)=>{
        getAdminUser((err, results)=>{
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
    updateUserAdmin : (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);

        body.admin_password = hashSync(body.admin_password, salt);

        updateUserAdmin(body, (err, results)=>{
            if(err){
                console.error(err);
                return
            }
            if(results.length == 0){
                return res.json({
                    success  : 0,
                    message: "Failed to update!"
                })
            }
            return res.json({
                success : 1,
                message : "Admin updated successfully!"
            })  
        })
    },
    deleteAdminUser : (req, res)=>{
        const adminId = req.params.id;
        deleteAdminUser(adminId, (err,results)=>{
            if(err){
                console.error(err);
                return
            }
            if(!results) {
                return res.json({
                    success : 0,
                    message : "Record not found!"
                })
            }
            return res.json({
                success : 1,
                message : "Admin user deleted successfully",
            })
        })
    },
}
