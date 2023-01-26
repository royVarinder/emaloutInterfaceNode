const pool = require("../../Config/database");

module.exports = {
    //FUNCTIONS TO MANAGE THE ADMIN USERS SERVICES =====> 
    create : (data, callback)=>{
        pool.query(`insert into admin_user (admin_username, admin_password, admin_channel)
         values(?,?,?)`,
         [
            data.admin_username,
            data.admin_password,
            data.admin_channel,
        ],
        (err, results, fields)=>{
            if(err){
                return callback(err);
            }
            return callback(null, results)
        }
        )
    },
    getAdminUser : callback=>{
        pool.query(`select * from admin_user`,
        [],
        (err, results, fields)=>{
            if(err){
                return callback(err);
            }
            return callback(null, results)
        }
        );
        
    },
    getAdminUserById : (id, callback)=>{
        pool.query(`select * from admin_user where admin_id = ?`,
        [id],
        (err, results, fields)=>{
            if(err){
                return callback(err);
            }
            return callback(null, results)
        }
        );
        
    },
    updateUserAdmin : (data,callback)=>{
        pool.query(`update admin_user set admin_username = ?, admin_password = ?, admin_channel = ? where admin_id= ?`,
        [
        data.admin_username,
        data.admin_password,
        data.admin_channel,
        data.admin_id
        ],
        (err, results, fields)=>{
            if(err){
                return callback(err);
            }
            return callback(null, results)
        }
        );
        
    },
    deleteAdminUser : (id, callback)=>{
        pool.query(`delete from admin_user where admin_id = ?`,
        [id],
        (err, results, fields)=>{
            if(err){
                return callback(err);
            }
            return callback(null, results)
        }
        );
        
    },


    
    //FUNCTIONS TO MANAGE THE BUSSINESSES SERVICES =====>
    // createNewBussiness : (data, callback)=>{
    //     pool.query(`insert into emalout_bussinesses (admin_username, admin_password, admin_channel)
    //      values(?,?,?)`,
    //      [
    //         data.admin_username,
    //         data.admin_password,
    //         data.admin_channel,
    //     ],
    //     (err, results, fields)=>{
    //         if(err){
    //             return callback(err);
    //         }
    //         return callback(null, results)
    //     }
    //     )
    // },
    
}