const { 
    createUserBussiness,
     getUserBussiness,
     getUserBussinessById,
    //    updateUserBussiness,
        // deleteBussinessById 
        addNewsController,
        updateNewsByIdController
    } = require("./userBussiness.contorller");
const router = require ("express").Router();


const userBussinessesCalling =()=>{
    try {
        //METHODS FOR ADMIN USER =====>
        router.post("/", createUserBussiness);
        router.get("/", getUserBussiness);
        router.get("/:id", getUserBussinessById);
        router.post("/addNews", addNewsController);
        router.post("/addNews/:id", updateNewsByIdController);
        // router.patch("/", updateUserBussiness);
        // router.delete("/:id", deleteBussinessById);
    } catch (error) {
        console.error(error);
    }
}

userBussinessesCalling();

module.exports = router;
