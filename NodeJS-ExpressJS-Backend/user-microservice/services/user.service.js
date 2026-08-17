const blogUserRepository = require("../repositories/blog-user.repository.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "user.service.js";



// ============================================================
// Get User By ID - starts
// ============================================================
async function getUserById(id){
    logger.info(`[${FILE_NAME}] Get user by ID service started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching user profile by ID`);
        const user = await blogUserRepository.findUserProfileById(id);

        if(!user){
            logger.warn(`[${FILE_NAME}] User not found by ID`);
            throw new Error(
                "User not found"
            );
        }

        logger.success(`[${FILE_NAME}] User fetched successfully by ID`);
        return user;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get user by ID`, error);
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
    logger.info(`[${FILE_NAME}] Get user by username service started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching user profile by username`);
        const user = await blogUserRepository.findUserProfileByUsername(username);

        if (!user) {
            logger.warn(`[${FILE_NAME}] User not found by username`);
            throw new Error("User not found");
        }

        logger.success(`[${FILE_NAME}] User fetched successfully by username`);
        return user;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get user by username`, error);
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
    logger.info(`[${FILE_NAME}] Delete user by ID service started`);

    try {
        logger.info(`[${FILE_NAME}] Deleting user through repository`);
        await blogUserRepository.deleteUserById(id);

        logger.success(`[${FILE_NAME}] User deleted successfully`);
        return {
            message:"User deleted successfully"
        };
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to delete user by ID`, error);
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
    logger.info(`[${FILE_NAME}] Search blog user by name service started`);

    try {
        logger.info(`[${FILE_NAME}] Searching blog users by name`);

        const result =
            await blogUserRepository.findBlogUsersByNameIgnoreCase(
                blogUsersId,
                searchText
            );

        logger.success(`[${FILE_NAME}] Blog user search completed successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to search blog user by name`, error);
        throw error;
    }
}
// ============================================================
// Search User By Username Or Full Name - ends
// ============================================================



// ============================================================
// Service Exports
// ============================================================
module.exports = {
    getUserById: getUserById,
    getUserByUsername: getUserByUsername,
    deleteUserById: deleteUserById,
    searchBlogUserByName: searchBlogUserByName
};