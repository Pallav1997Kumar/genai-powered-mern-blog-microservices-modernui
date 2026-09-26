const blogUserRepository = require("../repositories/blog-user.repository.js");
const ErrorMessage = require("../constants/error-message.constant.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "user.service.js";



// ============================================================
// Get User By ID - starts
// ============================================================
async function getUserById(id){
    devLogger.info(`[${FILE_NAME}] Get user by ID service started`);

    try {
        devLogger.info(`[${FILE_NAME}] Fetching user profile by ID`);
        const user = await blogUserRepository.findUserProfileById(id);

        if(!user){
            devLogger.warn(`[${FILE_NAME}] User not found by ID`);
            throw new Error(
                ErrorMessage.USER_NOT_FOUND
            );
        }

        devLogger.success(`[${FILE_NAME}] User fetched successfully by ID`);
        return user;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to get user by ID`, error);
        throw error;
    }
}
// ============================================================
// Get User By ID - ends
// ============================================================



// ============================================================
// Get User By Username - starts
// ============================================================
async function getUserByUsername(username) {
    devLogger.info(`[${FILE_NAME}] Get user by username service started`);

    try {
        devLogger.info(`[${FILE_NAME}] Fetching user profile by username`);
        const user = await blogUserRepository.findUserProfileByUsername(username);

        if (!user) {
            devLogger.warn(`[${FILE_NAME}] User not found by username`);
            throw new Error(ErrorMessage.USER_NOT_FOUND);
        }

        devLogger.success(`[${FILE_NAME}] User fetched successfully by username`);
        return user;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to get user by username`, error);
        throw error;
    }
}
// ============================================================
// Get User By Username - ends
// ============================================================



// ============================================================
// Delete User - starts
// ============================================================
async function deleteUserById(id){
    devLogger.info(`[${FILE_NAME}] Delete user by ID service started`);

    try {
        devLogger.info(`[${FILE_NAME}] Deleting user through repository`);
        await blogUserRepository.deleteUserById(id);

        devLogger.success(`[${FILE_NAME}] User deleted successfully`);
        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete user by ID`, error);
        throw error;
    }
}
// ============================================================
// Delete User - ends
// ============================================================



// ============================================================
// Search User By Username Or Full Name - starts
// ============================================================
async function searchBlogUserByName(searchText, blogUsersId) {
    devLogger.info(`[${FILE_NAME}] Search blog user by name service started`);

    try {
        devLogger.info(`[${FILE_NAME}] Searching blog users by name`);

        const result =
            await blogUserRepository.findBlogUsersByNameIgnoreCase(
                blogUsersId,
                searchText
            );

        devLogger.success(`[${FILE_NAME}] Blog user search completed successfully`);
        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to search blog user by name`, error);
        throw error;
    }
}
// ============================================================
// Search User By Username Or Full Name - ends
// ============================================================



// ============================================================
// Service Exports - starts
// ============================================================
module.exports = {
    getUserById: getUserById,
    getUserByUsername: getUserByUsername,
    deleteUserById: deleteUserById,
    searchBlogUserByName: searchBlogUserByName
};
// ============================================================
// Service Exports - ends
// ============================================================
