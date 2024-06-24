require("dotenv").config();             //Environment Configuration (process.env= .env);

const express = require("express");     //Dependencies and Middleware
const app = express();                  //Web framework for Node.js.
const multer = require("multer");       //Middleware for handling file uploads.
const path = require("path");           //working with file and directory paths.
const userRouter = require("./api/api_adminUsers/adminUser.Router"); //handling  API routes. 
const userBussRouter = require("./api/api_bussiness/userBussiness.Router");
const bussCategories = require("./api/api_bussCategories/bussCategories.Router");
const _userRoutes = require("./api/api_users/users.Router")
const cors = require("cors");           //Enable Cross-Origin Resource Sharing
const {sequelize} = require('./models/index');
const storage = multer.diskStorage({    //Multer for File Storage
    destination : './upload/images',
    filename : (req,file, cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const APP_NODE_URL = process.env.APP_NODE_URL;

const upload = multer({
    storage : storage
})
app.use(express.json());
app.use("/profile", express.static('upload/images'));
app.use("/profile", express.static('upload/videos'));
app.use(cors());
app.use("/api/api_adminUsers", userRouter);
app.use("/api/api_bussness", userBussRouter);
app.use("/api/api_bussCategories", bussCategories);
app.use("/api/api_users", _userRoutes);

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
                return  `${APP_NODE_URL}/profile/${items.filename}`
            })
        })
    }
})

sequelize.sync()

// Sync all defined models to the DB
app.listen(process.env.APP_PORT, ()=>{
    console.log('Your app is running on port:',process.env.APP_PORT);
});
// app.get("/", (req, res) => {
    
//     console.log(__dirname)
//     res.sendFile(`${__dirname}/view/index.html`)
// });


