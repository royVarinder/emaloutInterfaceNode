const {
    getAllNewsListService
} = require("./users.service")

module.exports = {
    getAllNewsListController: (req, res) => {
        getAllNewsListService(req.body, (err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: err,
                    data: []
                })
            }
            return res.json({
                success: 1,
                message: "Data fetched successfully",
                data: result
            })
        })
    }
}