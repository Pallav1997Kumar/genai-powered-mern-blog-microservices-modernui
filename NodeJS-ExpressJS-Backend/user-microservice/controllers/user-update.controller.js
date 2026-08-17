const profileService = require("../services/profile.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "user-update.controller.js";



// ============================================================
// Update User Profile Photo - starts
// ============================================================
const updateUserProfilePhoto = async function(req,res){
    logger.info(`[${FILE_NAME}] Update user profile photo request received`);

    try{
        logger.info(`[${FILE_NAME}] Calling profile service to update user profile photo`);
        
        const result = await profileService.updateUserProfilePhoto(
            req.params.userID,
            req.body
        );

        logger.success(`[${FILE_NAME}] User profile photo updated successfully`);

        logger.info(`[${FILE_NAME}] Sending profile photo update response to client`);
        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to update user profile photo`, error);
        logger.warn(`[${FILE_NAME}] Update user profile photo request could not be completed`);

        return res.status(
            error.status || 500
        )
        .json({
            message: error.message || "Internal Server Error"
        });
    }
};
// ============================================================
// Update User Profile Photo - ends
// ============================================================



// ============================================================
// Update User Basic Information - starts
// ============================================================
const updateUserBasicInformation = async function(req,res){
    logger.info(`[${FILE_NAME}] Update user basic information request received`);

    try{
        logger.info(`[${FILE_NAME}] Calling profile service to update user basic information`);

        const result = await profileService.updateUserBasicInformation(
            req.params.userID,
            req.body
        );

        logger.success(`[${FILE_NAME}] User basic information updated successfully`);

        logger.info(`[${FILE_NAME}] Sending basic information update response to client`);
        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to update user basic information`, error);
        logger.warn(`[${FILE_NAME}] Update user basic information request could not be completed`);

        return res.status(
            error.status || 500
        )
        .json({
            message: error.message || "Internal Server Error"
        });
    }
};
// ============================================================
// Update User Basic Information - ends
// ============================================================



// ============================================================
// Update User Email Username - starts
// ============================================================
const updateUserEmailUsername = async function(req,res){
    logger.info(`[${FILE_NAME}] Update user email and username request received`);

    try{
        logger.info(`[${FILE_NAME}] Calling profile service to update user email and username`);

        const result = await profileService.updateUserEmailUsername(
            req.params.userID,
            req.body
        );

        logger.success(`[${FILE_NAME}] User email and username updated successfully`);

        logger.info(`[${FILE_NAME}] Sending email and username update response to client`);
        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to update user email and username`, error);
        logger.warn(`[${FILE_NAME}] Update user email and username request could not be completed`);

        return res.status(
            error.status || 500
        )
        .json({
            message: error.message || "Internal Server Error"
        });
    }
};
// ============================================================
// Update User Email Username - ends
// ============================================================



// ============================================================
// Update User Password - starts
// ============================================================
const updateUserPassword = async function(req,res){
    logger.info(`[${FILE_NAME}] Update user password request received`);

    try{
        logger.info(`[${FILE_NAME}] Calling profile service to update user password`);

        const result = await profileService.updateUserPassword(
            req.params.userID,
            req.body
        );

        logger.success(`[${FILE_NAME}] User password updated successfully`);

        logger.info(`[${FILE_NAME}] Sending password update response to client`);
        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to update user password`, error);
        logger.warn(`[${FILE_NAME}] Update user password request could not be completed`);

        return res.status(
            error.status || 500
        )
        .json({
            message: error.message || "Internal Server Error"
        });
    }
};
// ============================================================
// Update User Password - ends
// ============================================================



// ============================================================
// Controller Exports
// ============================================================
module.exports = {
    updateUserProfilePhoto: updateUserProfilePhoto,
    updateUserBasicInformation:updateUserBasicInformation,
    updateUserEmailUsername:updateUserEmailUsername,
    updateUserPassword:updateUserPassword
};