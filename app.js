require("dotenv").config();             //Environment Configuration (process.env= .env);

const express = require("express");     //Dependencies and Middleware
const app = express();                  //Web framework for Node.js.
const connectDB = require("./Config/mongodbconnection");

const multer = require("multer");       //Middleware for handling file uploads.
const uploadFiles = require("./middleware/uploadFiles");
const path = require("path");           //working with file and directory paths.
const userRouter = require("./api/api_adminUsers/adminUser.Router"); //handling  API routes. 
const userBussRouter = require("./api/api_bussiness/userBussiness.Router");
const bussCategories = require("./api/api_bussCategories/bussCategories.Router");
const _userRoutes = require("./api/api_users/users.Router")
const ngoRoutes = require("./api/ngo/ngo.router");
const loginUserRoutes = require("./api/users/user.router");
const cors = require("cors");           //Enable Cross-Origin Resource Sharing
const {sequelize} = require('./models/index');
const organizationRouter = require("./api/organizations/router");
const requestLogger = require("./middleware/requestLogger");
const storage = multer.diskStorage({    //Multer for File Storage
    destination : './upload/images',
    filename : (req,file, cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const _newsRoutes = require("./api/api_news/news.Router");
const channelRouter = require("./api/channel/channel.router");
const { default: axios } = require("axios");
const { getServerIP, apiResponse } = require("./util");

// Tailor app backend (ported from tailor-app/server — same routes, same
// request/response shapes, so the tailor-app mobile client needs no changes
// beyond pointing EXPO_PUBLIC_API_URL at this server).
const tailorAuthRoutes = require("./tailor/routes/auth.routes");
const tailorCustomersRoutes = require("./tailor/routes/customers.routes");
const tailorMeasurementsRoutes = require("./tailor/routes/measurements.routes");
const tailorOrdersRoutes = require("./tailor/routes/orders.routes");
const tailorPaymentsRoutes = require("./tailor/routes/payments.routes");
const tailorSettingsRoutes = require("./tailor/routes/settings.routes");
const tailorDashboardRoutes = require("./tailor/routes/dashboard.routes");
const tailorBackupRoutes = require("./tailor/routes/backup.routes");
const { requireAuth: tailorRequireAuth } = require("./tailor/middleware/auth");
const { errorHandler: tailorErrorHandler } = require("./tailor/middleware/errorHandler");

const APP_NODE_URL = process.env.APP_NODE_URL;

const upload = multer({
    storage : storage
})
// Connect to DB
connectDB().catch(console.error);
app.use(express.json());
app.use(requestLogger);
app.use("/profile", express.static('upload/images'));
app.use("/profile", express.static('upload/videos'));
app.use(cors());
app.use("/api/admin", userRouter);
app.use("/api/api_bussness", userBussRouter);
app.use("/api/api_bussCategories", bussCategories);
app.use("/api/api_users", _userRoutes);
app.use("/api/api_news", _newsRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/users", loginUserRoutes);
app.use("/api/organization", organizationRouter);
app.use("/api/channel", channelRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Tailor app API — same paths as tailor-app/server (/api/auth, /api/customers, ...)
app.use("/api/auth", tailorAuthRoutes);
app.use("/api/customers", tailorRequireAuth, tailorCustomersRoutes);
app.use("/api/measurements", tailorRequireAuth, tailorMeasurementsRoutes);
app.use("/api/orders", tailorRequireAuth, tailorOrdersRoutes);
app.use("/api/payments", tailorRequireAuth, tailorPaymentsRoutes);
app.use("/api/settings", tailorRequireAuth, tailorSettingsRoutes);
app.use("/api/dashboard", tailorRequireAuth, tailorDashboardRoutes);
app.use("/api/backup", tailorRequireAuth, tailorBackupRoutes);
app.use(tailorErrorHandler);


//write a fucniton if api not found send 404 error
app.use((req, res, next) => {
    console.log('req.url :>> ', req.url);
    res.status(404).json({
        success : false,
        message : "API not found"
    })
})

//api for upload images files in 
app.post("/uploadImages", upload.array('shopImages'), (req, res)=>{
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

// Catch multer/upload errors (e.g. disallowed file type, size limit) as JSON
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error('Multer upload error :>> ', err);
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json(apiResponse(false, `File too large. Maximum allowed size is ${uploadFiles.MAX_FILE_SIZE_MB}MB.`, []));
        }
        return res.status(400).json(apiResponse(false, err.message, []));
    }
    if (err) {
        console.error(err);
        return res.status(400).json(apiResponse(false, err.message, []));
    }
    next();
});

// sequelize.sync()
getServerIP();
// Sync all defined models to the DB
app.listen(process.env.APP_PORT, '0.0.0.0', ()=>{
    console.log('Your app is running on port:', process.env.APP_PORT);
});






  
// app.get("/", (req, res) => {
    
//     console.log(__dirname)
//     res.sendFile(`${__dirname}/view/index.html`)
// });


