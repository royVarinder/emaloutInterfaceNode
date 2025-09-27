const { verifyToken } = require("../../Config/Util");
const uploadFiles = require("../../middleware/uploadFiles");
const {
    adminLogin,
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
        router.post("/admin-login", adminLogin);
    } catch (error) {
        console.error(error);
    }
}

adminUsersCalling();

module.exports = router;
