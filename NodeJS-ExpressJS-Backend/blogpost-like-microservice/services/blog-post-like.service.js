const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const ErrorMessage = require("../constants/error-message.constant.js");
const blogPostLikeRepository = require("../repositories/blog-post-like.repository.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-post-like.service.js";



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


const jwtPrivateKey = process.env.jwtPrivateKey;



// ============================================================
// Like Blog Post - starts
// ============================================================
async function blogPostLike(token, postID) {
    devLogger.info(`[${FILE_NAME}] Like blog post service started`);

    try {
        if(!token){
            devLogger.warn(`[${FILE_NAME}] Like post request received without authentication token`);
            throw {
                status:401,
                message:ErrorMessage.NOT_AUTHENTICATED
            };
        }

        if(!postID){
            devLogger.warn(`[${FILE_NAME}] Like post request received without post ID`);
            throw {
                status:400,
                message:ErrorMessage.POST_ID_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Verifying authentication token`);
        const userInformation = jwt.verify(token,jwtPrivateKey);
        devLogger.info(`[${FILE_NAME}] Authentication token verified successfully`);

        if(!userInformation.id){
            devLogger.warn(`[${FILE_NAME}] Authentication token does not contain user ID`);
            throw {
                status:401,
                message:ErrorMessage.INVALID_AUTHENTICATION_TOKEN
            };
        }

        const userID = userInformation.id;

        devLogger.info(`[${FILE_NAME}] Checking whether post is already liked`);
        const existingLike = await blogPostLikeRepository.findLike(userID,postID);

        if(existingLike){
            devLogger.warn(`[${FILE_NAME}] Post is already liked by the user`);
            throw {
                status:409,
                message:ErrorMessage.POST_ALREADY_LIKED
            };
        }

        devLogger.info(`[${FILE_NAME}] Creating blog post like through repository`);
        await blogPostLikeRepository.createLike(userID,postID);

        devLogger.success(`[${FILE_NAME}] Blog post liked successfully`);
        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to like blog post`, error);
        throw error;
    }
};
// ============================================================
// Like Blog Post - ends
// ============================================================



// ============================================================
// Unlike Blog Post - starts
// ============================================================
async function blogPostUnlike(token, postID) {
    devLogger.info(`[${FILE_NAME}] Unlike blog post service started`);

    try {
        if(!token){
            devLogger.warn(`[${FILE_NAME}] Unlike post request received without authentication token`);
            throw {
                status:401,
                message:ErrorMessage.NOT_AUTHENTICATED
            };
        }

        if(!postID){
            devLogger.warn(`[${FILE_NAME}] Unlike post request received without post ID`);
            throw {
                status:400,
                message:ErrorMessage.POST_ID_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Verifying authentication token`);
        const userInformation = jwt.verify(token, jwtPrivateKey);
        devLogger.info(`[${FILE_NAME}] Authentication token verified successfully`);

        if(!userInformation.id){
            devLogger.warn(`[${FILE_NAME}] Authentication token does not contain user ID`);
            throw {
                status:401,
                message:ErrorMessage.INVALID_AUTHENTICATION_TOKEN
            };
        }

        const userID = userInformation.id;

        devLogger.info(`[${FILE_NAME}] Deleting blog post like through repository`);
        const result = await blogPostLikeRepository.deleteLike(userID, postID);

        if(!result){
            devLogger.warn(`[${FILE_NAME}] Like was not found for the requested post`);
            throw {
                status:404,
                message:ErrorMessage.LIKE_NOT_FOUND
            };
        }

        devLogger.success(`[${FILE_NAME}] Blog post unliked successfully`);
        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to unlike blog post`, error);
        throw error;
    }
};
// ============================================================
// Unlike Blog Post - ends
// ============================================================



// ============================================================
// Get All Likes For Particular Blog - starts
// ============================================================
async function getAllLikesForParticularBlog(postID) {
    devLogger.info(`[${FILE_NAME}] Get all likes for particular blog service started`);

    try {
        if(!postID){
            devLogger.warn(`[${FILE_NAME}] Get likes request received without post ID`);
            throw {
                status:400,
                message:ErrorMessage.POST_ID_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Fetching blog post likes through repository`);
        const result = await blogPostLikeRepository.getLikesByPostId(postID);
        devLogger.success(`[${FILE_NAME}] Blog post likes fetched successfully`);

        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to get all likes for particular blog`, error);

        throw error;
    }
};
// ============================================================
// Get All Likes For Particular Blog - ends
// ============================================================



// ============================================================
// Delete All Likes By User ID - starts
// ============================================================
async function deleteAllLikesByUserId(userID) {
    devLogger.info(`[${FILE_NAME}] Delete all likes by user service started`);

    try {
        if(!userID){
            devLogger.warn(`[${FILE_NAME}] Delete user likes request received without user ID`);
            throw {
                status:400,
                message:ErrorMessage.USER_ID_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Deleting user likes through repository`);
        await blogPostLikeRepository.deleteLikesByUserId(userID);
        devLogger.success(`[${FILE_NAME}] All likes of user deleted successfully`);

        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete all likes by user ID`, error);
        throw error;
    }
};
// ============================================================
// Delete All Likes By User ID - ends
// ============================================================



// ============================================================
// Delete All Likes By Post ID - starts
// ============================================================
async function deleteAllLikesByPostId(postID) {
    devLogger.info(`[${FILE_NAME}] Delete all likes by post service started`);

    try {
        if(!postID){
            devLogger.warn(`[${FILE_NAME}] Delete post likes request received without post ID`);
            throw {
                status:400,
                message:ErrorMessage.POST_ID_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Deleting post likes through repository`);
        await blogPostLikeRepository.deleteLikesByPostId(postID);
        devLogger.success(`[${FILE_NAME}] All likes of post deleted successfully`);

        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete all likes by post ID`, error);
        throw error;
    }
};
// ============================================================
// Delete All Likes By Post ID - ends
// ============================================================



// ============================================================
// Service Exports - starts
// ============================================================
module.exports = {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog,
    deleteAllLikesByUserId,
    deleteAllLikesByPostId
};
// ============================================================
// Service Exports - ends
// ============================================================