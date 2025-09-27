
const router = require("express").Router();
const { verifyToken } = require("../../middleware");
const userController = require("./user.controller");
const uploadFiles = require("../../middleware/uploadFiles");

const userRouter = () => {
    try {
        router.post("/login", userController.registerUser);
        router.post("/admin-login", userController.adminLogin);
        router.post("/logout", userController.logoutUser);
        router.post("/profile", verifyToken, userController.profile);
        router.post("/register-channel", verifyToken, uploadFiles.single('logo'), userController.registerChannel);
        router.post("/login-channel", userController.loginChannel);
        router.post("/logout-channel", userController.logoutChannel);
    } catch (error) {
        console.error(error);
    }
}

userRouter();

module.exports = router;
