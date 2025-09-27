const uploadFiles = require("../../middleware/uploadFiles");
const newsController = require("./news.controller");
const router = require("express").Router();
const { verifyToken } = require("../../middleware");

const newsRouter = () => {
    try {
        router.post("/addNews", verifyToken, uploadFiles.array('files', 10), newsController.addNews);
        router.post("/updateNews", verifyToken, newsController.updateNews);
        router.post("/fetch-news-from-excel", verifyToken, uploadFiles.single('file'), newsController.fetchNewsFromExcel);
        router.post("/getNews", verifyToken, newsController.getNewsController);
        router.post("/addComment", verifyToken, newsController.addComment);
        router.post("/getComments", verifyToken, newsController.getComments);
        router.post("/updateComment", verifyToken, newsController.updateComment);
    } catch (error) {
        console.error(error);
    }
}
newsRouter();
module.exports = router;
