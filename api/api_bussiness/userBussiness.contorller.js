const Category = require("../../mongoModels/category");
const { apiResponse, uploadFile } = require("../../util");
const { v4: uuidv4 } = require('uuid');
const Business = require("../../mongoModels/bussiness");

module.exports = {
    createUpdateCategory: async (req, res) => {
        try {
            const { id } = req?.body;
            if (!!id) {
                //check if category name is already exists
                const category = await Category.findOne({ name: req.body.name });
                if (category) {
                    return res.json(apiResponse(false, "Category name already exists", []));
                }
                const updatedRow = await Category.findByIdAndUpdate(id, req.body, { new: true });
                return res.json(apiResponse(true, "Category updated successfully", []));
            } else {
                //check if category name is already exists
                const category = await Category.findOne({ name: req.body.name });
                if (category) {
                    return res.json(apiResponse(false, "Category name already exists", []));
                }
                const createdRow = await Category.create(req.body);
                return res.json(apiResponse(true, "Category created successfully", createdRow));
            }
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []));
        }
    },
    createUpdateBusiness: async (req, res) => {
        try {
            if (req?.body?.id) {
                const existingImages = await Business.findById(req.body.id);
                if (req.files?.length > 0) {
                    //append in the existing images
                    const fileData = await uploadFile(req.files, "business");
                    if (fileData?.length > 0) {
                        const newImages = fileData?.map((items) => {
                            return {
                                url: items,
                                uuid: uuidv4()
                            }
                        });
                        req.body.images = [...existingImages?.images, ...newImages];
                    }
                }
                if (!!req?.body?.deletedImages) {
                    const splitImages = req?.body?.deletedImages.split(",");
                    const remainingImages = existingImages?.images?.filter((items) => {
                        return !splitImages.includes(items?.uuid);
                    });
                    req.body.images = remainingImages;
                }
                const updatedRow = await Business.findByIdAndUpdate(req.body.id, req.body, { new: true });
                return res.json(apiResponse(true, "Business updated successfully", updatedRow));
            }
            if (req.files.length > 0) {
                const fileData = await uploadFile(req.files, "business");
                if (fileData?.length > 0) {
                    req.body.images = fileData?.map((items) => {
                        return {
                            url: items,
                            uuid: uuidv4()
                        }
                    });
                }
            }
            const createdRow = await Business.create(req.body);
            return res.json(apiResponse(true, "Business created successfully", createdRow));
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []));
        }
    },
    getBusiness: async (req, res) => {
        try {
            console.log('req.body :>> ', req.body);
            const page = parseInt(req.body.page) || 1;
            const limit = parseInt(req.body.limit) || 10;
            const skip = (page - 1) * limit;
            let where = {};
            if (req?.body?.id) {
                where = { _id: req?.body?.id };
            }
            if (req?.body?.category_id) {
                where = { category_id: req?.body?.category_id };
            }
            // if (Object.keys(where).length > 0) {
            const business = await Business
                .find({ ...where, status: 1 })
                .populate("category_id")
                .skip(skip)
                .limit(limit); //fetch category details with populate
            return res.json(apiResponse(true, "Business fetched successfully", business));
            // }
            // const business = await Business.find({ status: 1 }).populate("category_id"); //fetch business details with populate
            // return res.json(apiResponse(true, "Business fetched successfully", business));
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []));
        }
    },
    getCategories: async (req, res) => {
        try {
            let where = {};
            if (req?.body?.id) {
                where = { _id: req?.body?.id };
            }
            if (Object.keys(where).length > 0) {
                const categories = await Category.findById({ ...where, status: 1 }).populate("business"); //fetch business details with populate
                return res.json(apiResponse(true, "Categories fetched successfully", categories));
            }
            const categories = await Category.find({ status: 1 }).populate("business"); //fetch business details with populate
            return res.json(apiResponse(true, "Categories fetched successfully", categories));
        } catch (error) {
            console.error(error);
            return res.json(apiResponse(false, error.message, []));
        }
    }
}
