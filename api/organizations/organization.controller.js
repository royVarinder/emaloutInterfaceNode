const organizationModel = require("../../mongoModels/organization");
const { apiResponse, uploadFile, emailSend } = require("../../util");
const organizationEventsModel = require("../../mongoModels/orgevents");
const md5 = require("md5");

module.exports = {
    createOrganization: async (req, res) => {
        try {
            // Check if MongoDB is connected
            if (organizationModel.db.readyState !== 1) {
                return res.status(500).json(apiResponse(false, "Database not connected", []));
            }
            if (req?.files?.length > 0) {
                const fileData = await uploadFile(req?.files, "organization");
                req.body.logo = fileData[0];
            }
            const password = Math.random().toString(36).substring(2, 10);
            req.body.password = md5(password);

            const organization = await organizationModel.create(req.body);
            await emailSend(`${process.env.ADMIN_EMAIL}, ${organization.email}`, "New Organization Registered!", `
                New Organization Registered!
                Organization Name: ${organization.name}
                Organization Email: ${organization.email}
                Organization Password: ${password}
                Organization Date: ${organization.createdAt}
                Organization Address: ${organization.address}
                Organization Phone: ${organization.phone}
                !`);
            return res.status(200).json(apiResponse(true, "Organization created successfully", organization));
        } catch (error) {
            console.error('Organization creation error:', error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    updateOrganization: async (req, res) => {
        try {
            const organization = await organizationModel.findByIdAndUpdate(req.body.org_id, req.body, { new: true });
            return res.status(200).json(apiResponse(true, "Organization updated successfully", []));
        } catch (error) {
            console.error('Organization update error:', error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    getOrganization: async (req, res) => {
        try {
            //if id fetch one otherwise fetch all
            if (req.body.org_id) {
                //fetch events details
                const organization = await organizationModel.findOne({ _id: req.body.org_id, status: 1 }).populate('events');
                return res.status(200).json(apiResponse(true, "Organization fetched successfully", organization));
            }
            const organization = await organizationModel.find({ status: 1 }).populate('events');
            return res.status(200).json(apiResponse(true, "Organization fetched successfully", organization));
        } catch (error) {
            console.error('Organization fetch error:', error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    updateOrgLogo: async (req, res) => {
        try {
            const logo = await uploadFile(req.files, "organization");
            //resolev is promise resolve and
            const organization = await organizationModel.findByIdAndUpdate(req.body.org_id, { logo: logo[0] }, { new: true });
            return res.status(200).json(apiResponse(true, "Organization logo updated successfully", organization));
        } catch (error) {
            console.error('Organization logo update error:', error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    addOrgEvent: async (req, res) => {
        try {
            if (req.files.length > 0) {
                const fileData = await uploadFile(req.files, "organization_events");
                req.body.event_image = fileData[0];
            }
            const event = await organizationEventsModel.create(req.body);
            return res.status(200).json(apiResponse(true, "Organization event added successfully", event));
        } catch (error) {
            console.error('Organization event add error:', error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    updateOrgEvent: async (req, res) => {
        try {
            if (!req.body.event_id) {
                return res.status(400).json(apiResponse(false, "Event id is required", []));
            }
            if (req.files.length > 0) {
                const fileData = await uploadFile(req.files, "organization_events");
                req.body.event_image = fileData[0];
            }
            const event = await organizationEventsModel.findByIdAndUpdate(req.body.event_id, req.body, { new: true });
            return res.status(200).json(apiResponse(true, "Organization event updated successfully", event));
        } catch (error) {
            console.error('Organization event update error:', error);
            return res.status(500).json(apiResponse(false, error.message, []));
        }
    },
    getOrgEvent: async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;
            const limit = parseInt(req.body.limit) || 10;
            const skip = (page - 1) * limit;

            let query = { status: 1 };

            if (req.body.org_id) {
                query = { organization: req.body.org_id, status: 1 };
            } else if (req.body.event_id) {
                query = { _id: req.body.event_id, status: 1 };
            }

            const total = await organizationEventsModel.countDocuments(query);

            const events = await organizationEventsModel
                .find(query)
                .populate('organization')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            return res.status(200).json({
                returnCode: true,
                message: "Organization event fetched successfully",
                returnData: events,   // <-- DIRECT ARRAY
                page: page,
                totalPages: Math.ceil(total / limit)
            });

        } catch (error) {
            console.error('Organization event fetch error:', error);
            return res.status(500).json({
                success: false,
                message: error.message,
                returndata: []
            });
        }
    }


}
