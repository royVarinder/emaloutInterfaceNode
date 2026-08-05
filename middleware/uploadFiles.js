const multer = require('multer')

// Upload File Configuration - Using memory storage instead of disk storage

const storage = multer.memoryStorage();
//accept images and videos only, everywhere this middleware is used
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        return cb(null, true);
    }
    return cb(new Error('Only image and video files are allowed'));
};
//set the limit to 200mb to accommodate video uploads
const MAX_FILE_SIZE_MB = 200;
const uploadFiles = multer({ storage, fileFilter, limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 } });

uploadFiles.MAX_FILE_SIZE_MB = MAX_FILE_SIZE_MB;

module.exports = uploadFiles
