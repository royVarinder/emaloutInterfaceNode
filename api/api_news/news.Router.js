const uploadFiles = require("../../middleware/uploadFiles");
const { addNews,updateNews,getNewsByUuid } = require("./news.controller");
const router = require("express").Router();


const newsRouter = () => {
    try {
        router.post("/addNews",  uploadFiles.array('files'), addNews);
        router.post("/updateNews", updateNews);
        router.post("/getNewsByUuid", getNewsByUuid);
      
    } catch (error) {
        console.error(error);
    }
}

newsRouter();

module.exports = router;
