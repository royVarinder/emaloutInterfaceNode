const { createUser, getAdminUser, getAdminUserById, updateUserAdmin, deleteAdminUser , uploadImages} = require("./adminUser.contorller");
const router = require ("express").Router();


const adminUsersCalling =()=>{
    try {
        //METHODS FOR ADMIN USER =====>
        router.post("/", createUser);
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
