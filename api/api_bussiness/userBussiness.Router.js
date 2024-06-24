const { 
    createUserBussiness,
     getUserBussiness,
     getUserBussinessById,
    //    updateUserBussiness,
        // deleteBussinessById 
        addNewsController,
        updateNewsController,
        updateNewsByIdController,
        getNewsController,
        deleteNewsByIdController,
        updateNewsAnyKayByIdController,
        fetchAllNewsController, 
    } = require("./userBussiness.contorller");
const router = require ("express").Router();


const userBussinessesCalling =()=>{
    try {
        //METHODS FOR ADMIN USER =====>
        router.post("/", createUserBussiness);
        router.get("/", getUserBussiness);
        router.get("/:id", getUserBussinessById);
        router.post("/addNews", addNewsController);
        router.post("/updateNews", updateNewsController);
        router.post("/fetchAllNews", fetchAllNewsController);
        router.post("/addNews/:id", updateNewsByIdController);
        router.post("/fetchAllNews", getNewsController);
        router.post("/deleteNews/:id", deleteNewsByIdController);
        router.post("/updateNewsAnyKayById/:id", updateNewsAnyKayByIdController);
        // router.patch("/", updateUserBussiness);
        // router.delete("/:id", deleteBussinessById);
    } catch (error) {
        console.error(error);
    }
}

userBussinessesCalling();

module.exports = router;
