const {
    getAllNewsListService
} = require("./users.service")
const userTable = require("../../models").em_users;

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
    },
    addUserController: async(req, res) => {
        try {
            console.log('req.body :>> ', req.body);
            const createdUser = await userTable.create(req.body);
            console.log('createdUser :>> ', createdUser);

        } catch (error) {
            console.error(error);
        }
    }
}