const ErrorMessage = require("../constants/error-message.constant.js");
const SuccessMessage = require("../constants/success-message.constant.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "image-upload.controller.js";



// ============================================================
// Upload Blog Image - starts
// ============================================================
function uploadBlogImageController(req, res) {
    devLogger.info(`[${FILE_NAME}] Blog image upload request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Checking uploaded blog image`);

        if(!req.file){
            devLogger.warn(`[${FILE_NAME}] Blog image is missing`);
            return res.status(400).json({
                success:false,
                error:true,
                successMessage:"",
                errorMessage:ErrorMessage.BLOG_IMAGE_REQUIRED,
                file:null
            });
        }

        devLogger.info(`[${FILE_NAME}] Blog image received: ${req.file.originalname}`);
        devLogger.success(`[${FILE_NAME}] Blog image uploaded successfully`);
        devLogger.info(`[${FILE_NAME}] Sending blog image upload response`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_IMAGE_UPLOADED,
            errorMessage:"",
            file:req.file
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to upload blog image`, error);
        devLogger.warn(`[${FILE_NAME}] Blog image upload request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_UPLOAD_BLOG_IMAGE,
            file:null
        });
    }
}
// ============================================================
// Upload Blog Image - ends
// ============================================================



// ============================================================
// Upload Profile Photo - starts
// ============================================================
function uploadProfilePhotoController(req, res) {
    devLogger.info(`[${FILE_NAME}] Profile photo upload request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Checking uploaded profile photo`);

        if(!req.file){
            devLogger.warn(`[${FILE_NAME}] Profile photo is missing`);
            return res.status(400).json({
                success:false,
                error:true,
                successMessage:"",
                errorMessage:ErrorMessage.PROFILE_PHOTO_REQUIRED,
                file:null
            });
        }

        devLogger.info(`[${FILE_NAME}] Profile photo received: ${req.file.originalname}`);
        devLogger.info(`[${FILE_NAME}] Profile photo MIME type: ${req.file.mimetype}`);
        devLogger.success(`[${FILE_NAME}] Profile photo uploaded successfully`);
        devLogger.info(`[${FILE_NAME}] Sending profile photo upload response`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.PROFILE_PHOTO_UPLOADED,
            errorMessage:"",
            file:req.file
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to upload profile photo`, error);
        devLogger.warn(`[${FILE_NAME}] Profile photo upload request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_UPLOAD_PROFILE_PHOTO,
            file:null
        });
    }
}
// ============================================================
// Upload Profile Photo - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    uploadBlogImageController,
    uploadProfilePhotoController
};
// ============================================================
// Controller Exports - ends
// ============================================================