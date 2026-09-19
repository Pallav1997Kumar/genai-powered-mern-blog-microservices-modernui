const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");

const cloudinary = require("./cloudinary.config.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "multer.config.js";



// ============================================================
// Environment Configuration - starts
// ============================================================
const configPath =
    process.env.DEPLOYMENT_STRUCTURE ===
    "ALL_MICROSERVICES_ONE_DEPLOYMENT"
        ? "../config.env"
        : "./config.env";

dotenv.config({
    path: configPath
});
// ============================================================
// Environment Configuration - ends
// ============================================================



// ============================================================
// Upload Limits Starts
// ============================================================
const uploadLimits = {
    fileSize: 10 * 1024 * 1024,
    files: 1,
};
// ============================================================
// Upload Limits Ends
// ============================================================


// ============================================================
// Image File Filter Starts
// ============================================================
function imageFileFilter(req, file, callback) {
    if (process.env.environment === "development") {
        logger.info(
            `[${FILE_NAME}] Validating uploaded image: ${file.originalname}`
        );
    }

    const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        if (process.env.environment === "development") {
            logger.warn(
                `[${FILE_NAME}] Rejected image with unsupported MIME type: ${file.mimetype}`
            );
        }

        const error = new Error(
            "Only JPG, JPEG, PNG, and WebP images are allowed"
        );

        error.statusCode = 400;

        return callback(error);
    }

    if (process.env.environment === "development") {
        logger.success(
            `[${FILE_NAME}] Image file type validated successfully: ${file.mimetype}`
        );
    }

    callback(null, true);
}
// ============================================================
// Image File Filter Ends
// ============================================================



// ============================================================
// Blog Image Public ID Generator Starts
// ============================================================
function generateBlogImagePublicId(req, file) {
    const userID = req.query.userID;
    const baseName = path.parse(file.originalname).name;
    const publicID = Date.now() + "-" + userID + "-" + baseName;

    if (process.env.environment === "development") {
        logger.info(
            `[${FILE_NAME}] Generating Cloudinary public ID for blog image: ${publicID}`
        );
    }

    return publicID;
}
// ============================================================
// Blog Image Public ID Generator Ends
// ============================================================



// ============================================================
// Profile Photo Public ID Generator Starts
// ============================================================
function generateProfilePhotoPublicId(req, file) {
    const userID = req.query.userID;
    const baseName = path.parse(file.originalname).name;
    const publicID = Date.now() + "-" + userID + "-" + baseName;

    if (process.env.environment === "development") {
        logger.info(
            `[${FILE_NAME}] Generating Cloudinary public ID for profile photo: ${publicID}`
        );
    }

    return publicID;
}
// ============================================================
// Profile Photo Public ID Generator Ends
// ============================================================



// ============================================================
// Blog Image Storage Configuration Starts
// ============================================================
const blogImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads/blogImages",
        allowed_formats: [
            "jpg",
            "png",
            "jpeg",
            "webp"
        ],
        public_id: generateBlogImagePublicId
    }
});
// ============================================================
// Blog Image Storage Configuration Ends
// ============================================================


// ============================================================
// Profile Photo Storage Configuration Starts
// ============================================================
const profilePhotoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads/profilePhotos",
        allowed_formats: [
            "jpg",
            "png",
            "jpeg",
            "webp"
        ],
        public_id: generateProfilePhotoPublicId
    }
});
// ============================================================
// Profile Photo Storage Configuration Ends
// ============================================================



// ============================================================
// Blog Image Uploader Starts
// ============================================================
const uploadBlogImage = multer({
    storage: blogImageStorage,
    limits: uploadLimits,
    fileFilter: imageFileFilter
});

if (process.env.environment === "development") {
    logger.success(
        `[${FILE_NAME}] Blog image uploader configured successfully`
    );
}
// ============================================================
// Blog Image Uploader Ends
// ============================================================



// ============================================================
// Profile Photo Uploader Starts
// ============================================================
const uploadProfilePhoto = multer({
    storage: profilePhotoStorage,
    limits: uploadLimits,
    fileFilter: imageFileFilter
});

if (process.env.environment === "development") {
    logger.success(
        `[${FILE_NAME}] Profile photo uploader configured successfully`
    );
}
// ============================================================
// Profile Photo Uploader Ends
// ============================================================



// ============================================================
// Module Exports Starts
// ============================================================
module.exports = {
    uploadBlogImage,
    uploadProfilePhoto
};
// ============================================================
// Module Exports Ends
// ============================================================
