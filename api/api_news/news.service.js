const pool = require("../../Config/database");

module.exports = {
    //FUNCTIONS TO MANAGE THE ADMIN USERS SERVICES =====> 
    serviceCreateNews : (data, callback)=>{
        pool.query(`insert into emalout_news (title, description, author,facebook_link, insta_link, youtube_link, status, images, videos, channel_id, author_id, city_id)
        values(?,?,?,?,?,?,?,?,?,?,?,?)`,
         [
            data.title,
            data.description,
            data.author,
            data.facebook_link,
            data.insta_link,
            data.youtube_link,
            data.status,
            data.images,
            data.videos,
            data.channel_id,
            data.author_id,
            data.city_id
        ],
        (err, results, fields)=>{
            if(err){
                return callback(err);
            }
            return callback(null, results)
        }
        )
    },
    serviceGetNews : callback=>{
        pool.query(`select * from emalout_news`,
        [],
        (err, results, fields)=>{
            if(err){
                return callback(err);
            }
            return callback(null, results)
        }
        );
        
    },
    serviceGetNewsById : (id, callback)=>{
        pool.query(`select * from emalout_news where id = ?`,
        [id],
        (err, results, fields)=>{
            if(err){
                return callback(err);
            }
            return callback(null, results)
        }
        );
        
    },
}