
const router = require("express").Router();
const { verifyToken } = require("../../Config/Util");
const uploadFiles = require("../../middleware/uploadFiles");
const channelController = require("./channel.controller");


router.post("/create-channel", verifyToken, uploadFiles.array('logo'), channelController.createChannel);
router.post("/update-channel", verifyToken, uploadFiles.array('logo'), channelController.updateChannel);
router.post("/get-channel", verifyToken, channelController.getChannel);
router.post("/create-news",  uploadFiles.array('files'), channelController.createNews);
router.post("/update-news", verifyToken, uploadFiles.array('files'), channelController.updateNews);
router.post("/get-news", verifyToken, channelController.getNews);


module.exports = router;
