const {
    getAllNewsListController,
    addUserController,
} = require("./users.controller");

const router = require("express").Router();
const usersCalling = () => {
    try {
        router.post("/addUser", addUserController)
    } catch (error) {
        console.error(error);
    }
}

usersCalling();

module.exports = router;
