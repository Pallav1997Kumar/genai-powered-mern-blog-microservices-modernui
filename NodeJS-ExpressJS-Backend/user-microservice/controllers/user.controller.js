const dotenv = require("dotenv");

const userService = require("../services/user.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "user.controller.js";



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
// Get User By User ID - starts
// ============================================================
async function getUserById(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get user by ID request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling user service to fetch user by ID`);
        }
        const user = await userService.getUserById(req.params.id);
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User fetched successfully by ID`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending user by ID response to client`);
        }
        res.json(user);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch user by ID`, error);
            logger.warn(`[${FILE_NAME}] Get user by ID request could not be completed`);
        }

        res.status(404)
        .json({
            message:error.message
        });
    }
}
// ============================================================
// Get User By User ID - ends
// ============================================================



// ============================================================
// Get User By Username - starts
// ============================================================
async function getUserByUsername(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get user by username request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling user service to fetch user by username`);
        }
        const user = await userService.getUserByUsername(req.params.username);
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User fetched successfully by username`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending user by username response to client`);
        }
        res.json(user);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch user by username`, error);
            logger.warn(`[${FILE_NAME}] Get user by username request could not be completed`);
        }

        res.status(404)
        .json({
            message:error.message
        });
    }
}
// ============================================================
// Get User By Username - ends
// ============================================================



// ============================================================
// Delete User By ID - starts
// ============================================================
async function deleteUserById(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Delete user by ID request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling user service to delete user by ID`);
        }
        const result = await userService.deleteUserById(req.params.id);
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] User deleted successfully by ID`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending user deletion response to client`);
        }
        res.json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to delete user by ID`, error);
            logger.warn(`[${FILE_NAME}] Delete user by ID request could not be completed`);
        }

        res.status(500)
        .json({
            message:error.message
        });
    }
}
// ============================================================
// Delete User By ID - ends
// ============================================================



// ============================================================
// Search Blog User By Name - starts
// ============================================================
async function searchBlogUserByName(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Blog user search request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting blog user search parameters`);
        }
        const searchText = req.query.searchText;
        const blogUsersId = req.body.blogUsersId;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog user search text and user IDs extracted`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling user service for blog user search`);
        }
        const result = await userService.searchBlogUserByName(searchText, blogUsersId);
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Blog user search completed successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending blog user search response to client`);
        }
        return res.status(200).json(result);
    } 
    catch (error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Blog user search failed`, error);
            logger.warn(`[${FILE_NAME}] Blog user search request could not be completed`);
        }

        res.status(500)
        .json({
            message:error.message
        });
    }
};
// ============================================================
// Search Blog User By Name - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    getUserById,
    getUserByUsername,
    deleteUserById,
    searchBlogUserByName 
};
// ============================================================
// Controller Exports - ends
// ============================================================
