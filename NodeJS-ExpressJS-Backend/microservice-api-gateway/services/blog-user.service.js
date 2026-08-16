const httpClient = require("../utils/httpClient.js");
const logger = require("../utils/logger.js");

const {
    USER_SERVICE
} = require("../config/services");


const FILE_NAME = "blog-user.service.js";



// ============================================================
// Register User - starts
// ============================================================
const registerUser = async function(data){
    logger.info(`[${FILE_NAME}] User registration request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling user service registration API`);

        const response = await httpClient.post(
            `${USER_SERVICE}/api/users/register`,
            data
        );

        logger.info(`[${FILE_NAME}] User registration API response received`);
        logger.success(`[${FILE_NAME}] User registration completed successfully`);

        return response.data;
    } 
    catch(error) {
        logger.error(`[${FILE_NAME}] User registration failed`, error);

        throw {
            message: "Failed to register user",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Register User - ends
// ============================================================



// ============================================================
// Login User - starts
// ============================================================
const loginUser = async function(data){
    logger.info(`[${FILE_NAME}] User login request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling user service login API`);

        const response = await httpClient.post(
            `${USER_SERVICE}/api/users/login`,
            data
        );

        logger.info(`[${FILE_NAME}] User login API response received`);
        logger.info(`[${FILE_NAME}] Extracting authentication cookies`);

        const result = {
            data: response.data,
            cookies: response.headers["set-cookie"]
        };

        logger.success(`[${FILE_NAME}] User login completed successfully`);

        return result;
    } 
    catch(error) {
        logger.error(`[${FILE_NAME}] User login failed`, error);

        throw {
            message: "Failed to login user",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Login User - ends
// ============================================================



// ============================================================
// Delete Account - starts
// ============================================================
const deleteUser = async function(userID, token){
    logger.info(`[${FILE_NAME}] User account deletion request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling user service delete account API`);

        const response = await httpClient.delete(
            `${USER_SERVICE}/api/users/id/${userID}`,
            {
                headers:{
                    Cookie:`jwt_access_token=${token}`
                }
            }
        );

        logger.info(`[${FILE_NAME}] User account deletion API response received`);
        logger.success(`[${FILE_NAME}] User account deleted successfully`);

        return response.data;
    } 
    catch(error) {
        logger.error(`[${FILE_NAME}] User account deletion failed`, error);

        throw {
            message: "Failed to delete user account",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Delete Account - ends
// ============================================================



// ============================================================
// Logout - starts
// ============================================================
const logout = async function(cookie){
    logger.info(`[${FILE_NAME}] User logout request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling user service logout API`);

        const response = await httpClient.post(
            `${USER_SERVICE}/api/users/logout`,
            {},
            {
                headers:{
                    Cookie:cookie
                }
            }
        );

        logger.info(`[${FILE_NAME}] User logout API response received`);
        logger.success(`[${FILE_NAME}] User logout completed successfully`);

        return response.data;
    } 
    catch(error) {
        logger.error(`[${FILE_NAME}] User logout failed`, error);

        throw {
            message: "Failed to logout user",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Logout - ends
// ============================================================



// ============================================================
// Update Profile Photo - starts
// ============================================================
const updateUserProfilePhoto = async function(userID, data, headers){
    logger.info(`[${FILE_NAME}] Profile photo update request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling user service profile photo update API`);

        const response = await httpClient.put(
            `${USER_SERVICE}/api/users/update/profile-photo/${userID}`,
            data,
            {
                headers
            }
        );

        logger.info(`[${FILE_NAME}] Profile photo update API response received`);
        logger.success(`[${FILE_NAME}] Profile photo updated successfully`);

        return response.data;
    } 
    catch(error) {
        logger.error(`[${FILE_NAME}] Profile photo update failed`, error);

        throw {
            message: "Failed to update profile photo",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Update Profile Photo - ends
// ============================================================



// ============================================================
// Update Basic Information - starts
// ============================================================
const updateUserBasicInformation = async function(userID, data, headers){
    logger.info(`[${FILE_NAME}] Basic information update request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling user service basic information update API`);

        const response = await httpClient.put(
            `${USER_SERVICE}/api/users/update/basic-information/${userID}`,
            data,
            {
                headers
            }
        );

        logger.info(`[${FILE_NAME}] Basic information update API response received`);
        logger.success(`[${FILE_NAME}] Basic information updated successfully`);

        return response.data;
    } 
    catch(error) {
        logger.error(`[${FILE_NAME}] Basic information update failed`, error);

        throw {
            message: "Failed to update basic information",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Update Basic Information - ends
// ============================================================



// ============================================================
// Update Email Username - starts
// ============================================================
const updateUserEmailUsername = async function(userID, data, headers){
    logger.info(`[${FILE_NAME}] Email and username update request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling user service email username update API`);

        const response = await httpClient.put(
            `${USER_SERVICE}/api/users/update/email-username/${userID}`,
            data,
            {
                headers
            }
        );

        logger.info(`[${FILE_NAME}] Email username update API response received`);
        logger.success(`[${FILE_NAME}] Email and username updated successfully`);

        return response.data;
    } 
    catch(error) {
        logger.error(`[${FILE_NAME}] Email username update failed`, error);

        throw {
            message: "Failed to update email or username",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Update Email Username - ends
// ============================================================



// ============================================================
// Update Password - starts
// ============================================================
const updateUserPassword = async function(userID, data, headers){
    logger.info(`[${FILE_NAME}] Password update request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling user service password update API`);

        const response = await httpClient.put(
            `${USER_SERVICE}/api/users/update/password/${userID}`,
            data,
            {
                headers
            }
        );

        logger.info(`[${FILE_NAME}] Password update API response received`);
        logger.success(`[${FILE_NAME}] Password updated successfully`);

        return response.data;
    } 
    catch(error) {
        logger.error(`[${FILE_NAME}] Password update failed`, error);

        throw {
            message: "Failed to update password",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Update Password - ends
// ============================================================



// ============================================================
// Get User By ID - starts
// ============================================================
const getUserByID = async function(userID, headers = {}){
    logger.info(`[${FILE_NAME}] Fetch user by ID request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling user service get user by ID API`);

        const response = await httpClient.get(
            `${USER_SERVICE}/api/users/id/${userID}`,
            {
                headers
            }
        );

        logger.info(`[${FILE_NAME}] Get user by ID API response received`);
        logger.success(`[${FILE_NAME}] User details fetched successfully`);

        return response.data;
    } 
    catch(error) {
        logger.error(`[${FILE_NAME}] Fetch user by ID failed`, error);

        throw {
            message: "Failed to fetch user by ID",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Get User By ID - ends
// ============================================================



// ============================================================
// Get User By Username - starts
// ============================================================
const getUserByUsername = async function(username, headers = {}){
    logger.info(`[${FILE_NAME}] Fetch user by username request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling user service get user by username API`);

        const response = await httpClient.get(
            `${USER_SERVICE}/api/users/username/${username}`,
            {
                headers
            }
        );

        logger.info(`[${FILE_NAME}] Get user by username API response received`);
        logger.success(`[${FILE_NAME}] User details fetched successfully`);

        return response.data;
    } 
    catch(error) {
        logger.error(`[${FILE_NAME}] Fetch user by username failed`, error);

        throw {
            message: "Failed to fetch user by username",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Get User By Username - ends
// ============================================================



// ============================================================
// Search User By Name - starts
// ============================================================
const searchBlogUserByName = async function(searchText, blogUsersId, headers = {}) {
    logger.info(`[${FILE_NAME}] User search request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling user service search user API`);

        const response = await httpClient.post(
            `${USER_SERVICE}/api/users/search?searchText=${searchText}`,
            {
                blogUsersId
            },
            {
                headers
            }
        );

        logger.info(`[${FILE_NAME}] User search API response received`);
        logger.success(`[${FILE_NAME}] User search completed successfully`);

        return response.data;
    } 
    catch(error) {
        logger.error(`[${FILE_NAME}] User search failed`, error);

        throw {
            message: "Failed to search users",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Search User By Name - ends
// ============================================================



// ============================================================
// Service Exports
// ============================================================
module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    logout,
    updateUserProfilePhoto,
    updateUserBasicInformation,
    updateUserEmailUsername,
    updateUserPassword,
    getUserByID,
    getUserByUsername,
    searchBlogUserByName
};
// ============================================================
// Service Exports - ends
// ============================================================