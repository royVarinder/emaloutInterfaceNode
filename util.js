const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const apiResponse = (code, message, data = []) => {
    try {
        const responseMessage = {}
        responseMessage.returnCode = code
        responseMessage.message = message
        responseMessage.returnData = data
        return responseMessage;
    } catch (error) {
        console.error(error);
        return { returnCode: false, message: error.message, data: [] }
    }
}

const uploadFile = async (files, folderName) => {
    try {
        const result = await Promise.all(files.map(async (file) => {
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = `data:${file.mimetype};base64,${b64}`;
            const result = await cloudinary.uploader.upload(dataURI, {
                folder: folderName,
            });
            return result.url;
        }));
        return result;
    } catch (error) {
        console.error(error?.message);
        throw new Error(error?.message);
    }
}
const emailSend = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        }
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error(error);
        throw new Error(error?.message);
    }
}

module.exports = {
    apiResponse,
    uploadFile,
    emailSend
}

