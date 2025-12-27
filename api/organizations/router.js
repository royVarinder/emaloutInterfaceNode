
const router = require("express").Router();
const { verifyToken } = require("../../Config/Util");
const uploadFiles = require("../../middleware/uploadFiles");
const organizationController = require("./organization.controller");


router.post("/create-organization", verifyToken, uploadFiles.array('logo'), organizationController.createOrganization);
router.post("/update-org", verifyToken, organizationController.updateOrganization);
router.post("/get-org", verifyToken, organizationController.getOrganization);
router.post("/update-org-logo", verifyToken, uploadFiles.array('files'), organizationController.updateOrgLogo);
router.post("/create-event", uploadFiles.array('event_image'), organizationController.addOrgEvent);
router.post("/update-event", verifyToken, uploadFiles.array('event_image'), organizationController.updateOrgEvent);
router.post("/get-event", verifyToken, organizationController.getOrgEvent);

module.exports = router;
