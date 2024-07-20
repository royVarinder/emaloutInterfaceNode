const {
    getAllNewsListService
} = require("./users.service")
const userTable = require("../../models").em_users;
const contactUsTable = require("../../models").em_contact_us;
const { v4: uuidv4 } = require('uuid');

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
            const createdUser = await userTable.create(req.body);
        } catch (error) {
            console.error(error);
        }
    },
    contactUs: async(req, res) => {
        try {
            const { uuid } = req.body;
                 req.body['uuid'] = uuidv4();
                 const createdRow = await contactUsTable.create(req.body);
                 if (!!createdRow) {
                        return res.json(
                            {
                                success: 1,
                                message: "contactUs Information Added.",
                            }
                        )
                 }
            return res.json(
                {
                    success: 0,
                    message: "Something went wrong!",
                }
            )
        } catch (error) {
            console.error(error);
            return res.json(
                {
                    success: 0,
                    message: error.message,
                }
            )
        }
    }
}