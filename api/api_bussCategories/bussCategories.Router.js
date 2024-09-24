const { 
    // createUserBussiness, 
    serviceGetBussCategories, 
    // getUserBussinessById, 
    // updateUserBussiness, 
    // deleteBussinessById 
} = require("./bussCategories.contorller");
const router = require ("express").Router();


const userBussinessesCalling =()=>{
    try {
        //METHODS FOR ADMIN USER =====>
        // router.post("/", createUserBussiness);
        router.post("/getBussCategory", serviceGetBussCategories);
        // router.get("/:id", getUserBussinessById);
        // router.patch("/", updateUserBussiness);
        // router.delete("/:id", deleteBussinessById);
    } catch (error) {
        console.error(error);
    }
}

userBussinessesCalling();

module.exports = router;
