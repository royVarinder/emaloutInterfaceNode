const multer = require('multer')
const path = require('path')

// Upload File Configuration

const storage = multer.diskStorage({
    destination: 'upload/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const uploadFiles = multer({
    storage: storage
})


module.exports = uploadFiles
