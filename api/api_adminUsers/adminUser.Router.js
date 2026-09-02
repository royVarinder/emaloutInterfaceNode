const { verifyToken, verifySuperAdmin } = require("../../Config/Util");
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
    addUpdateChannel,
    listAllUsers,
    logoutUserSession,
    disableUser,
    deleteUser
} = require("./adminUser.contorller");
const router = require("express").Router();


const adminUsersCalling = () => {
    try {
        //METHODS FOR ADMIN USER =====>
        router.post("/admin-login", adminLogin);

        //SUPER ADMIN: USER MANAGEMENT =====>
        router.post("/users-list", verifySuperAdmin, listAllUsers);
        router.post("/logout-user", verifySuperAdmin, logoutUserSession);
        router.post("/disable-user", verifySuperAdmin, disableUser);
        router.post("/delete-user", verifySuperAdmin, deleteUser);
    } catch (error) {
        console.error(error);
    }
}

adminUsersCalling();

module.exports = router;
