const { apiResponse, uploadFile } = require("../../util");
const models = require("../../models");

module.exports = {
    addNGO: async (req, res) => {
        try {
            const { files } = req.body;
            // if (files) {
            //     const fileData = await uploadFile(files);
            //     req.body.files = fileData.url;
            // }
            const ngo = await models.em_ngo.create(req.body);
            return res.status(200).json(apiResponse(true, "NGO added successfully", ngo));
        } catch (error) {
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    getNGO: async (req, res) => {
        try {
            const ngo = await models.em_ngo.findAll({
                where: {
                    ...req.body,
                    is_active: 1
                }
            });
            return res.status(200).json(apiResponse(true, "NGO fetched successfully", ngo));
        } catch (error) {
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    deleteNGO: async (req, res) => {
        try {
            const ngo = await models.em_ngo.update({ is_active: 0 }, { where: { ...req.body } });
            return res.status(200).json(apiResponse(true, "NGO deleted successfully", []));
        } catch (error) {
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    addNGOEvent: async (req, res) => {
        try {
            if (req.files.length > 0) {
                const fileData = await uploadFile(req.files, 'ngo_events');
                const event_image = fileData.map(file => file.url).join(',');
                req.body.event_image = event_image;
            }
            const ngoEvent = await models.em_ngo_events.create(req.body);
            return res.status(200).json(apiResponse(true, "NGO event added successfully", ngoEvent));
        } catch (error) {
            console.log('error :>> ', error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    updateNGOEvent: async (req, res) => {
        try {
            const { uuid, file } = req.body;
            // if (file) {
            //     const fileData = await uploadFile(file);
            //     req.body.file = fileData.url;
            // }
            const ngoEvent = await models.em_ngo_events.update(req.body, { where: { uuid } });
            return res.status(200).json(apiResponse(true, "NGO event updated successfully", []));
        } catch (error) {
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    getNGOEvent: async (req, res) => {
        try {
            const ngoEvent = await models.em_ngo_events.findAll({ where: { ...req.body, is_active: 1 } });
            return res.status(200).json(apiResponse(true, "NGO event fetched successfully", ngoEvent));
        } catch (error) {
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    }
}