const ErrorMessage = require("../constants/error-message.constant.js");
const SuccessMessage = require("../constants/success-message.constant.js");
const userService = require("../services/user.service.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "user.controller.js";



// ============================================================
// Get User By User ID - starts
// ============================================================
async function getUserById(req,res){
    devLogger.info(`[${FILE_NAME}] Get user by ID request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Calling user service to fetch user by ID`);
        const user = await userService.getUserById(req.params.id);

        devLogger.success(`[${FILE_NAME}] User fetched successfully by ID`);
        devLogger.info(`[${FILE_NAME}] Sending user by ID response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.USER_FETCHED,
            errorMessage:"",
            resultData:user
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to fetch user by ID`, error);
        devLogger.warn(`[${FILE_NAME}] Get user by ID request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:error.message || ErrorMessage.FAILED_TO_FETCH_USER_BY_ID,
            resultData:[]
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
    devLogger.info(`[${FILE_NAME}] Get user by username request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Calling user service to fetch user by username`);
        const user = await userService.getUserByUsername(req.params.username);

        devLogger.success(`[${FILE_NAME}] User fetched successfully by username`);
        devLogger.info(`[${FILE_NAME}] Sending user by username response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.USER_FETCHED,
            errorMessage:"",
            resultData:user
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to fetch user by username`, error);
        devLogger.warn(`[${FILE_NAME}] Get user by username request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:error.message || ErrorMessage.FAILED_TO_FETCH_USER_BY_USERNAME,
            resultData:[]
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
    devLogger.info(`[${FILE_NAME}] Delete user by ID request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Calling user service to delete user by ID`);
        const result = await userService.deleteUserById(req.params.id);

        devLogger.success(`[${FILE_NAME}] User deleted successfully by ID`);
        devLogger.info(`[${FILE_NAME}] Sending user deletion response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.USER_DELETED,
            errorMessage:"",
            resultData:[]
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to delete user by ID`, error);
        devLogger.warn(`[${FILE_NAME}] Delete user by ID request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:error.message || ErrorMessage.FAILED_TO_DELETE_USER,
            resultData:[]
        });
    }
}
// ============================================================
// Delete User By ID - ends
// ============================================================



// ============================================================
// Search Blog User By Name - starts
// ============================================================
async function searchBlogUserByName(req,res,next){
    devLogger.info(`[${FILE_NAME}] Blog user search request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting blog user search parameters`);
        const searchText = req.query.searchText;
        const blogUsersId = req.body.blogUsersId;
        devLogger.info(`[${FILE_NAME}] Blog user search text and user IDs extracted`);

        devLogger.info(`[${FILE_NAME}] Calling user service for blog user search`);
        const result = await userService.searchBlogUserByName(searchText,blogUsersId);

        devLogger.success(`[${FILE_NAME}] Blog user search completed successfully`);
        devLogger.info(`[${FILE_NAME}] Sending blog user search response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_USER_SEARCH_COMPLETED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Blog user search failed`, error);
        devLogger.warn(`[${FILE_NAME}] Blog user search request could not be completed`);

        return res.status(error.status || 500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:error.message || ErrorMessage.FAILED_TO_SEARCH_BLOG_USER,
            resultData:[]
        });
    }
}
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