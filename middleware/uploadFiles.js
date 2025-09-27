const multer = require('multer')

// Upload File Configuration - Using memory storage instead of disk storage

const storage = multer.memoryStorage();
//set the limit to 50mb
const uploadFiles = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

module.exports = uploadFiles
