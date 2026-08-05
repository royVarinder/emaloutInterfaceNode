const cloudinary = require('cloudinary').v2;
const { default: axios } = require('axios');
const nodemailer = require('nodemailer');
const { Readable } = require('stream');
const crypto = require('crypto');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
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

// Requests bigger than this go through chunked upload so a single slow/large
// upload doesn't get killed by Cloudinary's ~60s per-request timeout.
const VIDEO_CHUNK_SIZE = 6 * 1024 * 1024; // 6MB per chunk
const UPLOAD_TIMEOUT_MS = 120000; // 2 minutes per request/chunk

const uploadOneFile = (file, folderName) => {
    return new Promise((resolve, reject) => {
        const isVideo = file.mimetype.startsWith('video/');

        const onDone = (error, result) => {
            if (error) {
                return reject(new Error(error.message || 'Upload failed'));
            }
            resolve(result.secure_url);
        };

        const uploadStream = isVideo
            ? cloudinary.uploader.upload_chunked_stream({
                folder: folderName,
                resource_type: 'video',
                chunk_size: VIDEO_CHUNK_SIZE,
                timeout: UPLOAD_TIMEOUT_MS,
            }, onDone)
            : cloudinary.uploader.upload_stream({
                folder: folderName,
                resource_type: 'image',
                timeout: UPLOAD_TIMEOUT_MS,
            }, onDone);

        if (isVideo) {
            let uploadedBytes = 0;
            // Fires once per chunk as it's handed off to Cloudinary, so this
            // tracks actual upload progress, not just local buffering.
            uploadStream.on('ready', (buffer) => {
                uploadedBytes += buffer.length;
                const percent = Math.min(100, (uploadedBytes / file.size) * 100).toFixed(1);
                console.log(`uploadFile: "${file.originalname}" progress ${percent}% (${uploadedBytes}/${file.size} bytes)`);
            });
        }

        uploadStream.on('error', reject);
        Readable.from([file.buffer]).pipe(uploadStream);
    });
};

const uploadFile = async (files, folderName) => {
    try {
        console.log(`uploadFile: uploading ${files.length} file(s) to folder "${folderName}"`);
        const result = await Promise.all(files.map(async (file) => {
            console.log(`uploadFile: uploading "${file.originalname}" (${file.mimetype}, ${file.size} bytes)`);
            const url = await uploadOneFile(file, folderName);
            console.log(`uploadFile: uploaded "${file.originalname}" -> ${url}`);
            return url;
        }));
        return result;
    } catch (error) {
        console.error('uploadFile error :>> ', error?.message || error);
        throw new Error(error?.message || 'File upload failed');
    }
}

// S3 replacement for uploadFile — same (files, folderName) -> string[] of URLs
// contract, so it drops into the same call sites. Accepts images and videos.
const uploadOneFileToS3 = async (file, folderName) => {
    const key = `${folderName}/${crypto.randomUUID()}${path.extname(file.originalname)}`;
    await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    }));
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

const uploadFileToS3 = async (files, folderName) => {
    try {
        console.log(`uploadFileToS3: uploading ${files.length} file(s) to folder "${folderName}"`);
        const result = await Promise.all(files.map(async (file) => {
            console.log(`uploadFileToS3: uploading "${file.originalname}" (${file.mimetype}, ${file.size} bytes)`);
            const url = await uploadOneFileToS3(file, folderName);
            console.log(`uploadFileToS3: uploaded "${file.originalname}" -> ${url}`);
            return url;
        }));
        return result;
    } catch (error) {
        console.error('uploadFileToS3 error :>> ', error?.message || error);
        throw new Error(error?.message || 'File upload failed');
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
            from: "Emalout <info@emalout.com>",
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

const getServerIP = async () => {
    try {
        const res = await axios.get("http://checkip.amazonaws.com");
        console.table(res.data);
    } catch (error) {
        console.error("Error in getServerIP", error?.message);
    }
}

const generatePassword = () => {
    //generate password with 8 characters contain uppercase, lowercase, numbers and special characters
    const password = Math.random().toString(36).substring(2, 10);
    return password;
}

module.exports = {
    apiResponse,
    uploadFile,
    uploadFileToS3,
    emailSend,
    getServerIP,
    generatePassword
}

