const userService = require("../services/user.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "user.controller.js";



// ============================================================
// Get User By User ID - starts
// ============================================================
async function getUserById(req,res){
    logger.info(`[${FILE_NAME}] Get user by ID request received`);

    try{
        logger.info(`[${FILE_NAME}] Calling user service to fetch user by ID`);
        const user = await userService.getUserById(req.params.id);
        logger.success(`[${FILE_NAME}] User fetched successfully by ID`);

        logger.info(`[${FILE_NAME}] Sending user by ID response to client`);
        res.json(user);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch user by ID`, error);
        logger.warn(`[${FILE_NAME}] Get user by ID request could not be completed`);

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
    logger.info(`[${FILE_NAME}] Get user by username request received`);

    try{
        logger.info(`[${FILE_NAME}] Calling user service to fetch user by username`);
        const user = await userService.getUserByUsername(req.params.username);
        logger.success(`[${FILE_NAME}] User fetched successfully by username`);

        logger.info(`[${FILE_NAME}] Sending user by username response to client`);
        res.json(user);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch user by username`, error);
        logger.warn(`[${FILE_NAME}] Get user by username request could not be completed`);

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
    logger.info(`[${FILE_NAME}] Delete user by ID request received`);

    try{
        logger.info(`[${FILE_NAME}] Calling user service to delete user by ID`);
        const result = await userService.deleteUserById(req.params.id);
        logger.success(`[${FILE_NAME}] User deleted successfully by ID`);

        logger.info(`[${FILE_NAME}] Sending user deletion response to client`);
        res.json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to delete user by ID`, error);
        logger.warn(`[${FILE_NAME}] Delete user by ID request could not be completed`);

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
const searchBlogUserByName = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Blog user search request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting blog user search parameters`);
        const searchText = req.query.searchText;
        const blogUsersId = req.body.blogUsersId;

        logger.info(`[${FILE_NAME}] Blog user search text and user IDs extracted`);

        logger.info(`[${FILE_NAME}] Calling user service for blog user search`);
        const result = await userService.searchBlogUserByName(searchText, blogUsersId);
        logger.success(`[${FILE_NAME}] Blog user search completed successfully`);

        logger.info(`[${FILE_NAME}] Sending blog user search response to client`);
        return res.status(200).json(result);
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Blog user search failed`, error);
        logger.warn(`[${FILE_NAME}] Blog user search request could not be completed`);

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