const {
    getAllNewsListService
} = require("./users.service")
const userTable = require("../../models").em_users;
const categoryTable = require("../../models").em_category;
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
    addUserController: async (req, res) => {
        try {
            const createdUser = await userTable.create(req.body);

        } catch (error) {
            console.error(error);
        }
    },
    addUpdateCategory: async (req, res) => {
        try {
            const { uuid } = req.body;
            if (!!uuid) {
                const updatedRow = await categoryTable.update(req.body, {
                    where: {
                        uuid,
                    }
                });
                if (updatedRow > 0) {
                    return res.json(
                        {
                            success: 1,
                            message: "Category updated",
                        }
                    )
                }
            } else {
                req.body['uuid'] = uuidv4();
                const createdRow = await categoryTable.create(req.body);
                if (!!createdRow) {
                    return res.json(
                        {
                            success: 1,
                            message: "Category added successfully.",
                        }
                    )
                }
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
    },
    fetchCategory: async (req, res) => {
        try {
            const { uuid } = req.body;

            if (!!uuid) {
                const findNews = await categoryTable.findOne({ where: { uuid, status: 1 } });

                if (findNews) {
                    return res.json({
                        success: 1,
                        message: "All category fetched successfully!",
                        data: findNews,
                    });
                }
            }
            const categoryData = await categoryTable.findAll({ where: { status: 1 } });
            return res.json(
                {
                    success: 1,
                    message: "All category fetched successfully!",
                    data: categoryData
                }
            )


        } catch (error) {
            console.error(error);
            return res.json({
                success: 0,
                message: error.message,
            });
        }
    }
}