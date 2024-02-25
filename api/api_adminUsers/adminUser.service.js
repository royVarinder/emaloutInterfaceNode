const { printCurrentTimeStamp } = require("../../Config/Util");
const pool = require("../../Config/database");

module.exports = {
    //FUNCTIONS TO MANAGE THE ADMIN USERS SERVICES =====> 
    create: (data, callback) => {
        pool.query(`insert into admin_user (admin_username, admin_password, admin_channel)
         values(?,?,?)`,
            [
                data.admin_username,
                data.admin_password,
                data.admin_channel,
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results)
            }
        )
    },
    getAdminUser: callback => {
        pool.query(`select * from admin_user`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results)
            }
        );

    },
    getAdminUserById: (id, callback) => {
        pool.query(`select * from admin_user where admin_id = ?`,
            [id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results)
            }
        );

    },
    updateUserAdmin: (data, callback) => {
        pool.query(`update admin_user set admin_username = ?, admin_password = ?, admin_channel = ? where admin_id= ?`,
            [
                data.admin_username,
                data.admin_password,
                data.admin_channel,
                data.admin_id
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results)
            }
        );

    },
    deleteAdminUser: (id, callback) => {
        pool.query(`delete from admin_user where admin_id = ?`,
            [id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results)
            }
        );
    },

    validateAdminUserService: (reqData, callback) => {
        pool.query('SELECT id, admin_username, admin_channel  FROM admin_user where admin_username = ? and admin_password = ?; ',
            [reqData?.admin_username, reqData?.admin_password],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results)
            }
        )
    },

    getChannelDetailsService: (reqData, callback) => {
        pool.query('SELECT * FROM emalout_channels where channel_admin_id = ? and channel_status = ?;',
            [reqData, '1'],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results)
            }
        )
    },

    addUpdateNewsService: (reqData, callback) => {
        const currentTimeStamp = printCurrentTimeStamp();
        const { newsId, channel_id, title, description, images, author_name } = reqData;
        if (!!newsId) {
            //update
            pool.query('UPDATE `emalout_news` SET `title` = ?, `description` = ?, `images` =?, `author_name` = ?, `status` = ?, `channel_id`=?, `updatedAt` = ? WHERE `id` = ?;',
                [title, description, images, author_name, '1', channel_id, currentTimeStamp, newsId],
                (err, result, fields) => {
                    if (err) {
                        console.log('err :>> ', err?.sql);
                        return callback(err?.sqlMessage)
                    }
                    return callback(null, result)
                }
            )
        } else {
            // add new
            pool.query("INSERT INTO `emalout_news` (`title`,`description`,`images`,`author_name`, `channel_id`, `status`, `createdAt`, `updatedAt` ) VALUES (?,?,?,?,?,?,?,?);",
                [title, description, images, author_name, channel_id, '1', currentTimeStamp, currentTimeStamp],
                (err, result, fields) => {
                    if (err) {
                        console.log('err :>> ', err?.sql);
                        return callback(err?.sqlMessage)
                    }
                    return callback(null, result)
                }
            )
        }
    },
    getNewsListService: (reqData, callback) => {
        const { channel_id } = reqData;
        pool.query("SELECT * FROM emalout_news where channel_id = ? and `status` = ?;",
            [channel_id, '1'],
            (err, result, fields) => {
                if (err) {
                    console.log('err :>> ', err?.sql);
                    return callback(err?.sqlMessage)
                }
                return callback(null, result)
            }
        )
    },
    getChannelMenuListService: (reqData, callback) => {
        pool.query("SELECT * FROM `emalout_channel_menu_list` WHERE `status` = ? ",
            ['1'],
            (err, result, fields) => {
                if (err) {
                    console.log('err :>> ', err?.sql);
                    return callback(err?.sqlMessage)
                }
                return callback(null, result)
            })

    }
}