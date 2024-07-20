const {
    getAllNewsListController,
    addUserController,
    contactUs,
} = require("./users.controller");

const router = require("express").Router();
const usersCalling = () => {
    try {
        router.post("/addUser", addUserController);
        router.post("/contactUs", contactUs);
    } catch (error) {
        console.error(error);
    }
}

usersCalling();

module.exports = router;
