const { 
    createUserBussiness,
     getUserBussiness,
     getUserBussinessById,
    //    updateUserBussiness,
        // deleteBussinessById 
    } = require("./userBussiness.contorller");
const router = require ("express").Router();


const userBussinessesCalling =()=>{
    try {
        //METHODS FOR ADMIN USER =====>
        router.post("/", createUserBussiness);
        router.get("/", getUserBussiness);
        router.get("/:id", getUserBussinessById);
        // router.patch("/", updateUserBussiness);
        // router.delete("/:id", deleteBussinessById);
    } catch (error) {
        console.error(error);
    }
}

userBussinessesCalling();

module.exports = router;
