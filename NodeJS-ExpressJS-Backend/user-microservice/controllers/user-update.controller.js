const ErrorMessage = require("../constants/error-message.constant.js");
const SuccessMessage = require("../constants/success-message.constant.js");
const profileService = require("../services/profile.service.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "user-update.controller.js";



// ============================================================
// Update User Profile Photo - starts
// ============================================================
async function updateUserProfilePhoto(req,res){
    devLogger.info(`[${FILE_NAME}] Update user profile photo request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Calling profile service to update user profile photo`);
        const result = await profileService.updateUserProfilePhoto(req.params.userID,req.body.imageDetail);
        
        devLogger.success(`[${FILE_NAME}] User profile photo updated successfully`);
        devLogger.info(`[${FILE_NAME}] Sending profile photo update response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.PROFILE_PHOTO_UPDATED,
            errorMessage:"",
            resultData:[]
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to update user profile photo`, error);
        devLogger.warn(`[${FILE_NAME}] Update user profile photo request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:error.message || ErrorMessage.INTERNAL_SERVER_ERROR,
            resultData:[]
        });
    }
}
// ============================================================
// Update User Profile Photo - ends
// ============================================================



// ============================================================
// Update User Basic Information - starts
// ============================================================
async function updateUserBasicInformation(req,res){
    devLogger.info(`[${FILE_NAME}] Update user basic information request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Calling profile service to update user basic information`);
        const result = await profileService.updateUserBasicInformation(req.params.userID, req.body);

        devLogger.success(`[${FILE_NAME}] User basic information updated successfully`);
        devLogger.info(`[${FILE_NAME}] Sending basic information update response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BASIC_INFORMATION_UPDATED,
            errorMessage:"",
            resultData:[]
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to update user basic information`, error);
        devLogger.warn(`[${FILE_NAME}] Update user basic information request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:error.message || ErrorMessage.INTERNAL_SERVER_ERROR,
            resultData:[]
        });
    }
}
// ============================================================
// Update User Basic Information - ends
// ============================================================



// ============================================================
// Update User Email Username - starts
// ============================================================
async function updateUserEmailUsername(req,res){
    devLogger.info(`[${FILE_NAME}] Update user email and username request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Calling profile service to update user email and username`);
        const result = await profileService.updateUserEmailUsername(req.params.userID, req.body);

        devLogger.success(`[${FILE_NAME}] User email and username updated successfully`);
        devLogger.info(`[${FILE_NAME}] Sending email and username update response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.EMAIL_AND_USERNAME_UPDATED,
            errorMessage:"",
            resultData:[]
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to update user email and username`, error);
        devLogger.warn(`[${FILE_NAME}] Update user email and username request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:error.message || ErrorMessage.INTERNAL_SERVER_ERROR,
            resultData:[]
        });
    }
}
// ============================================================
// Update User Email Username - ends
// ============================================================



// ============================================================
// Update User Password - starts
// ============================================================
async function updateUserPassword(req,res){
    devLogger.info(`[${FILE_NAME}] Update user password request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Calling profile service to update user password`);
        const result =
            await profileService.updateUserPassword(req.params.userID, req.body);

        devLogger.success(`[${FILE_NAME}] User password updated successfully`);
        devLogger.info(`[${FILE_NAME}] Sending password update response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.PASSWORD_UPDATED,
            errorMessage:"",
            resultData:[]
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to update user password`, error);
        devLogger.warn(`[${FILE_NAME}] Update user password request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:error.message || ErrorMessage.INTERNAL_SERVER_ERROR,
            resultData:[]
        });
    }
}
// ============================================================
// Update User Password - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    updateUserProfilePhoto: updateUserProfilePhoto,
    updateUserBasicInformation: updateUserBasicInformation,
    updateUserEmailUsername: updateUserEmailUsername,
    updateUserPassword: updateUserPassword
};
// ============================================================
// Controller Exports - ends
// ============================================================