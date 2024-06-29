const {
    createUser,
    getAdminUser,
    getAdminUserById,
    updateUserAdmin,
    deleteAdminUser,
    validateAdminUser,
    addUpdateNews,
    getNewsListController,
    getChannelMenuListController,
    getNewsDetailsController
} = require("./adminUser.contorller");
const router = require("express").Router();


const adminUsersCalling = () => {
    try {
        //METHODS FOR ADMIN USER =====>
        router.post("/", createUser);
        router.post("/validate_admin_user", validateAdminUser); //when user login
        router.post("/getNewsDetails", getNewsDetailsController); //when user login
        router.post("/addUpdateNews", addUpdateNews);
        router.post("/getNewsList", getNewsListController);
        router.post("/getChannelMenuList", getChannelMenuListController);
        router.get("/", getAdminUser);
        router.get("/:id", getAdminUserById);
        router.patch("/", updateUserAdmin);
        router.delete("/:id", deleteAdminUser);
    } catch (error) {
        console.error(error);
    }
}

adminUsersCalling();

module.exports = router;
