const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

const cloudinary = require("./cloudinary.config.js");
const ErrorMessage = require("../constants/error-message.constant.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "multer.config.js";



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
    devLogger.info(`[${FILE_NAME}] Validating uploaded image: ${file.originalname}`);

    const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        devLogger.warn(`[${FILE_NAME}] Rejected image with unsupported MIME type: ${file.mimetype}`);
        
        const error = new Error(ErrorMessage.UNSUPPORTED_IMAGE_FORMATS);
        error.statusCode = 400;
        return callback(error);
    }

    devLogger.success(`[${FILE_NAME}] Image file type validated successfully: ${file.mimetype}`);
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

    devLogger.info(`[${FILE_NAME}] Generating Cloudinary public ID for blog image: ${publicID}`);
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

    devLogger.info(`[${FILE_NAME}] Generating Cloudinary public ID for profile photo: ${publicID}`);
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

devLogger.success(`[${FILE_NAME}] Blog image uploader configured successfully`);
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

devLogger.success(`[${FILE_NAME}] Profile photo uploader configured successfully`);
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