require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const userRouter = require("./api/api_adminUsers/adminUser.Router");
const userBussRouter = require("./api/api_bussiness/userBussiness.Router");
const bussCategories = require("./api/api_bussCategories/bussCategories.Router");
const cors = require("cors");

const storage = multer.diskStorage({
    destination : './upload/images',
    filename : (req,file, cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage : storage
})

app.use(express.json());
app.use("/profile", express.static('upload/images'));
app.use(cors());
app.use("/api/api_adminUsers", userRouter);
app.use("/api/api_bussness", userBussRouter);
app.use("/api/api_bussCategories", bussCategories);

//api for upload images files in 
app.post("/uploadImages", upload.array('profile'), (req, res)=>{
    if(req.files.length === 0){
        res.json({
            success : false,
            bussImageURL : []
        })    
    }else{
        res.json({
            success : true,
            bussImageURL : req.files.map((items)=>{
                return  `http://localhost:8000/profile/${items.filename}`
            })
        })
    }
})

app.listen(process.env.APP_PORT, ()=>{
    console.log('Your app is running on port:',process.env.APP_PORT);
});
app.get("/", (req, res) => {
    
    console.log(__dirname)
    res.sendFile(`${__dirname}/view/index.html`)
});


