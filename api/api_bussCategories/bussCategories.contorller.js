
const { genSaltSync, hashSync } = require('bcrypt');
const { em_category } = require('../../models')
const { apiResponse } = require("../../util");
module.exports = {
    serviceGetBussCategories: async (req, res) => {
        try {
            const categories = await em_category.findAll({ where: { status: "1" } })
            if (!!categories) {
                return res.json(apiResponse(true, "Category fetched successfully!", categories))
            }
            return res.json(apiResponse(false, "Failed to fetch categories!", []))
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []))
        }
    },
}
