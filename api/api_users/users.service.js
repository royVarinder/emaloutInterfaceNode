const pool = require("../../Config/database");

module.exports = {
    getAllNewsListService: (data, callback) => {
        pool.query(`SELECT * FROM emalout_news order by id desc`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results)
            }
        );
    }
}