const {
    getAllNewsListController,
} = require("./users.controller");

const router = require("express").Router();
const usersCalling = () => {
    try {
        router.post("/getNewsListForUsers", getAllNewsListController)
    } catch (error) {
        console.error(error);
    }
}

usersCalling();

module.exports = router;
