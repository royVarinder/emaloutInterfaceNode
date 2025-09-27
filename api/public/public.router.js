const router = require("express").Router();
const publicController = require("./publicContoller");
const publicRouter = () => {
    try {
        router.post("/get-all-channels", publicController.getAllChannels);
    } catch (error) {
        console.error(error);
    }
}
publicRouter();
module.exports = router;