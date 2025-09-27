const controller = require("./ngo.controller");
const uploadFiles = require("../../middleware/uploadFiles");
const router = require("express").Router();
const ngoCalling = () => {
    try {
        router.post("/add-ngo", controller.addNGO);
        // router.post("/update-ngo", controller.updateNGO);
        router.post("/fetch-ngo", controller.getNGO);
        router.post("/delete-ngo", controller.deleteNGO);
        router.post("/add-ngo-event", uploadFiles.array('files'), controller.addNGOEvent);
        router.post("/update-ngo-event", controller.updateNGOEvent);
        router.post("/get-ngo-event", controller.getNGOEvent);
    } catch (error) {
        console.error(error);
    }
}

ngoCalling();

module.exports = router;
