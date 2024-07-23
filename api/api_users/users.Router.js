const {
    getAllNewsListController,
    addUserController,
    addUpdateCategory,
    fetchCategory,
} = require("./users.controller");

const router = require("express").Router();
const usersCalling = () => {
    try {
        router.post("/addUser", addUserController);
        router.post("/addUpdateCategory", addUpdateCategory);
        router.post("/fetchCategory", fetchCategory);
    } catch (error) {
        console.error(error);
    }
}

usersCalling();

module.exports = router;
