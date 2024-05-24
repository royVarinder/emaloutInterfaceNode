const pool = require("../../Config/database");

module.exports = {
    //FUNCTIONS TO MANAGE THE ADMIN USERS SERVICES =====> 
    serviceCreateBussiness : (data, callback)=>{
        pool.query(`insert into emalout_bussinesses (user_name, user_contact, buss_name,buss_contact, category_id, buss_address, buss_city, buss_district, features, weekdays, buss_images, buss_email)
        values(?,?,?,?,?,?,?,?,?,?,?,?)`,
         [
            data.yourName,
            data.yourContact,
            data.bussinessName,
            data.bussinessContact,
            data.selectCategory_id,
            data.buss_address,
            data.buss_city,
            data.buss_district,
            data.selectFeature,
            data.selectWeekDays,
            data.bussImages,
            data.emailAddress
        ],
        (err, results, fields)=>{
            if(err){
                return callback(err);
            }
            return callback(null, results)
        }
        )
    },

    addNewsService:(reqData,callback)=>{
    console.log('reqData :>> ', reqData);
    pool.query(`insert into emalout_news (title, description, author,facebook_link, insta_link, youtube_link, status, images, videos, channel_id, author_id, city_id)
        values(?,?,?,?,?,?,?,?,?,?,?,?)`,
         [
            reqData.title,
            reqData.description,
            reqData.author,
            reqData.facebook_link,
            reqData.insta_link,
            reqData.youtube_link,
            reqData.status,
            reqData.images,
            reqData.videos,
            reqData.channel_id,
            reqData.author_id,
            reqData.city_id
        ],
        (err, results, fields)=>{
            if(err){
                return callback(err);
            }
            return callback(null, results)
        }
        )
    },
    
    updateNewsByIdService:(reqData,callback)=>{
    console.log('reqData :>> ', reqData);
    pool.query(`update emalout_news set title=?, description=?, author=?,facebook_link=?, insta_link=?, youtube_link=?, status=?, images=?, videos=?, channel_id=?, author_id=?, city_id=? where id=?`,[
            reqData.title,
            reqData.description,
            reqData.author,
            reqData.facebook_link,
            reqData.insta_link,
            reqData.youtube_link,
            reqData.status,
            reqData.images,
            reqData.videos,
            reqData.channel_id,
            reqData.author_id,
            reqData.city_id,
            reqData.id
    ],
    (err,result,fields)=>{
        if(err){
            return callback(err);
        }
        return callback(null,result)
    })
    },
//     INSERT INTO `emalout`.`emalout_bussinesses`
//             (`id`,
//              `user_name`,
//              `user_contact`,
//              `buss_name`,
//              `buss_contact`,
//              `category_id`,
//              `buss_address`,
//              `buss_city`,
//              `buss_district`,
//              `features`,
//              `weekdays`,
//              `create_time_stamp`,
//              `buss_images`)
// VALUES ('id',
//         'user_name',
//         'user_contact',
//         'buss_name',
//         'buss_contact',
//         'category_id',
//         'buss_address',
//         'buss_city',
//         'buss_district',
//         'features',
//         'weekdays',
//         'create_time_stamp',
//         'buss_images');
    serviceGetBussinesses : callback=>{
        pool.query(`select * from emalout_bussinesses`,
        [],
        (err, results, fields)=>{
            if(err){
                return callback(err);
            }
            return callback(null, results)
        }
        );
        
    },
    serviceGetBussinessById : (id, callback)=>{
        pool.query(`select * from emalout_bussinesses where id = ?`,
        [id],
        (err, results, fields)=>{
            if(err){
                return callback(err);
            }
            return callback(null, results)
        }
        );
        
    },
    // serviceUpdateBussiness : (data,callback)=>{
    //     pool.query(`update admin_user set admin_username = ?, admin_password = ?, admin_channel = ? where admin_id= ?`,
    //     [
    //     data.admin_username,
    //     data.admin_password,
    //     data.admin_channel,
    //     data.admin_id
    //     ],
    //     (err, results, fields)=>{
    //         if(err){
    //             return callback(err);
    //         }
    //         return callback(null, results)
    //     }
    //     );
        
    // },
    // serviceDeleteBussiness : (id, callback)=>{
    //     pool.query(`delete from admin_user where admin_id = ?`,
    //     [id],
    //     (err, results, fields)=>{
    //         if(err){
    //             return callback(err);
    //         }
    //         return callback(null, results)
    //     }
    //     );
        
    // },


    
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