const { addNews } = require("./news.controller");
const router = require("express").Router();


const newsRouter = () => {
    try {
        router.post("/addNews", addNews);
      
    } catch (error) {
        console.error(error);
    }
}

newsRouter();

module.exports = router;
