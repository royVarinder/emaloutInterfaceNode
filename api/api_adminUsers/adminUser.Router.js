const uploadFiles = require("../../middleware/uploadFiles");
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
    getNewsDetailsController,
    addUpdateChannel
} = require("./adminUser.contorller");
const router = require("express").Router();


const adminUsersCalling = () => {
    try {
        //METHODS FOR ADMIN USER =====>
        router.post("/createAdminUser", createUser);
        router.post("/validate_admin_user", validateAdminUser); //when user login
        router.post("/getNewsDetails", getNewsDetailsController); //when user login
        router.post("/addUpdateNews", addUpdateNews);
        router.post("/getNewsList", getNewsListController);
        router.post("/getChannelMenuList", getChannelMenuListController);
        router.get("/", getAdminUser);
        router.post("/getAdminUser/:id", getAdminUserById);
        router.patch("/", updateUserAdmin);
        router.delete("/:id", deleteAdminUser);


        ///new apis with sequilizer
        router.post("/addUpdateChannel", uploadFiles.single('channelLogo'), addUpdateChannel)


    } catch (error) {
        console.error(error);
    }
}

adminUsersCalling();

module.exports = router;
