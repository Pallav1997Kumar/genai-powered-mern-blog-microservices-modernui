const dotenv = require("dotenv");

const profileService = require("../services/profile.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "user-update.controller.js";



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
// Update User Profile Photo - starts
// ============================================================
async function updateUserProfilePhoto(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Update user profile photo request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling profile service to update user profile photo`);
        }
        
        const result = await profileService.updateUserProfilePhoto(
            req.params.userID,
            req.body.imageDetail
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User profile photo updated successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending profile photo update response to client`);
        }
        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to update user profile photo`, error);
            logger.warn(`[${FILE_NAME}] Update user profile photo request could not be completed`);
        }

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
async function updateUserBasicInformation(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Update user basic information request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling profile service to update user basic information`);
        }

        const result = await profileService.updateUserBasicInformation(
            req.params.userID,
            req.body
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User basic information updated successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending basic information update response to client`);
        }
        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to update user basic information`, error);
            logger.warn(`[${FILE_NAME}] Update user basic information request could not be completed`);
        }

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
async function updateUserEmailUsername(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Update user email and username request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling profile service to update user email and username`);
        }

        const result = await profileService.updateUserEmailUsername(
            req.params.userID,
            req.body
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User email and username updated successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending email and username update response to client`);
        }
        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to update user email and username`, error);
            logger.warn(`[${FILE_NAME}] Update user email and username request could not be completed`);
        }

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
async function updateUserPassword(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Update user password request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling profile service to update user password`);
        }

        const result = await profileService.updateUserPassword(
            req.params.userID,
            req.body
        );

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User password updated successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending password update response to client`);
        }
        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to update user password`, error);
            logger.warn(`[${FILE_NAME}] Update user password request could not be completed`);
        }

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
// Controller Exports - starts
// ============================================================
module.exports = {
    updateUserProfilePhoto: updateUserProfilePhoto,
    updateUserBasicInformation:updateUserBasicInformation,
    updateUserEmailUsername:updateUserEmailUsername,
    updateUserPassword:updateUserPassword
};
// ============================================================
// Controller Exports - ends
// ============================================================
