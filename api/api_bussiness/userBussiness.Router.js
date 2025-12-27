const router = require("express").Router();
const { verifyToken } = require("../../Config/Util");
const uploadFiles = require("../../middleware/uploadFiles");
const businessController = require("./userBussiness.contorller");



router.post("/createUpdateCategory", businessController.createUpdateCategory);
router.post("/createUpdateBusiness", uploadFiles.array("files"), businessController.createUpdateBusiness);
router.post("/getBusiness", verifyToken, businessController.getBusiness); //get business by category id
router.post("/getCategories", verifyToken, businessController.getCategories);


module.exports = router;

