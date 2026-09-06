const userService = require("../services/blog-user.service.js");
const blogPostService = require("../services/blog-post.service.js");
const blogCommentService = require("../services/blog-comment.service.js");
const blogLikeService = require("../services/blog-post-like.service.js");

const handleError = require("../utils/errorHandler.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "authorization.controller.js";



// ============================================================
// Blog User Registration Starts
// ============================================================
async function blogUserRegistration(req,res){
    logger.info(`[${FILE_NAME}] Blog user registration request received`);

    try{
        logger.info(`[${FILE_NAME}] Extracting registration request body`);
        const body = req.body;

        logger.info(`[${FILE_NAME}] Calling user service for registration`);
        const result = await userService.registerUser(body);
        logger.success(`[${FILE_NAME}] Blog user registration completed successfully`);

        logger.info(`[${FILE_NAME}] Sending registration response to client`);
        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Blog user registration failed: `, error);
        logger.warn(`[${FILE_NAME}] Registration request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Blog User Registration Ends
// ============================================================



// ============================================================
// Blog User Login Starts
// ============================================================
async function blogUserLogin(req,res){
    logger.info(`[${FILE_NAME}] Blog user login request received`);

    try{
        logger.info(`[${FILE_NAME}] Extracting login request body`);
        const body = req.body;

        logger.info(`[${FILE_NAME}] Calling user service for login`);
        const result = await userService.loginUser(body);
        logger.info(`[${FILE_NAME}] Login service execution completed`);

        if(result.cookies){
            logger.info(`[${FILE_NAME}] Authentication cookie received from login service`);
            res.setHeader(
                "Set-Cookie",
                result.cookies
            );
            logger.success(`[${FILE_NAME}] Authentication cookie attached to response`);
        }
        else {
            logger.warn(`[${FILE_NAME}] Login completed without authentication cookie`);
        }

        logger.success(`[${FILE_NAME}] Blog user login completed successfully`);

        logger.info(`[${FILE_NAME}] Sending login response to client`);
        return res.status(200).json(result.data);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Blog user login failed: `, error);
        logger.warn(`[${FILE_NAME}] Login request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Blog User Login Ends
// ============================================================



// ============================================================
// Delete User Account Starts
// ============================================================
async function blogUserAccountDelete(req,res){
    logger.warn(`[${FILE_NAME}] Blog user account deletion request received`);

    try{
        logger.info(`[${FILE_NAME}] Extracting authentication token from cookies`);
        const token = req.body.token || req.cookies?.jwt_access_token;

        logger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        if (!token) {
            logger.warn(`[${FILE_NAME}] Account deletion requested without authentication token`);
        }

        if (!userID) {
            logger.warn(`[${FILE_NAME}] Account deletion requested without user ID`);
        }


        logger.info(`[${FILE_NAME}] Starting deletion of all user blog related data for user: ${userID}`);

        logger.info(`[${FILE_NAME}] Calling blog comment service to delete all comments by user: ${userID}`);
        const deleteUserCommentsResult = await blogCommentService.deleteCommentsByUserId(userID, token);
        logger.info(`[${FILE_NAME}] All user comments deleted successfully for user: ${userID}`);
        logger.success(`[${FILE_NAME}] User comments deletion completed successfully`);

        logger.info(`[${FILE_NAME}] Calling blog like service to delete all likes by user: ${userID}`);
        const deleteUserLikeResult = await blogLikeService.deleteLikesByUserId(userID, token);
        logger.info(`[${FILE_NAME}] All user likes deleted successfully for user: ${userID}`);
        logger.success(`[${FILE_NAME}] User likes deletion completed successfully`);

        logger.info(`[${FILE_NAME}] Calling blog post service to get all blog post IDs for user: ${userID}`);
        const blogPostIdsByUserId = await blogPostService.getAllBlogPostIdsByUserId(userID);
        logger.info(`[${FILE_NAME}] Received blog post IDs for user: ${userID}. Total posts: ${blogPostIdsByUserId.length}`);
        logger.success(`[${FILE_NAME}] Blog post IDs fetched successfully for user: ${userID}`);

        for (const post of blogPostIdsByUserId) {
            const postID = post._id;

            logger.info(`[${FILE_NAME}] Processing deletion for blog post: ${postID}`);

            logger.info(`[${FILE_NAME}] Calling blog like service to delete all likes for post: ${postID}`);
            const deleteAllLikesByPostIdResult = await blogLikeService.deleteAllLikesForPost(postID, token);
            logger.info(`[${FILE_NAME}] All likes deleted successfully for post: ${postID}`);
            logger.success(`[${FILE_NAME}] Blog likes deletion completed successfully for post: ${postID}`);

            logger.info(`[${FILE_NAME}] Calling blog comment service to delete all comments for post: ${postID}`);
            const deleteAllCommentsByPostIdResult = await blogCommentService.deleteCommentsByPostId(postID, token);
            logger.info(`[${FILE_NAME}] All comments deleted successfully for post: ${postID}`);
            logger.success(`[${FILE_NAME}] Blog comments deletion completed successfully for post: ${postID}`);
        }

        logger.info(`[${FILE_NAME}] Calling blog post service to delete all blogs for user: ${userID}`);
        const deleteUserBlogsResult = await blogPostService.deleteBlogPostsByUser(userID, token);
        logger.info(`[${FILE_NAME}] All user blog posts deleted successfully for user: ${userID}`);
        logger.success(`[${FILE_NAME}] User blog posts deletion completed successfully`);

        logger.info(`[${FILE_NAME}] Calling user service for account deletion`);
        const deleteUserResult = await userService.deleteUser(userID, token);
        logger.info(`[${FILE_NAME}] User service completed account deletion`);

        logger.info(`[${FILE_NAME}] Clearing authentication cookie`);
        res.clearCookie("jwt_access_token");
        logger.info(`[${FILE_NAME}] Cleared authentication cookie`);

        logger.success(`[${FILE_NAME}] Blog user account deleted successfully`);

        logger.info(`[${FILE_NAME}] Sending account deletion response to client`);
        return res.status(200).json(deleteUserResult);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Blog user account deletion failed: `,error);
        logger.warn(`[${FILE_NAME}] Account deletion request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Delete User Account Ends
// ============================================================



// ============================================================
// Logout User Starts
// ============================================================
async function blogUserLogout(req,res){
    logger.info(`[${FILE_NAME}] Blog user logout request received`);

    try{
        logger.info(`[${FILE_NAME}] Extracting authentication token from cookies`);
        const token = req.cookies?.jwt_access_token;

        if (!token) {
            logger.warn(`[${FILE_NAME}] Logout requested without authentication token`);
        }

        logger.info(`[${FILE_NAME}] Calling user service for logout`);
        const result = await userService.logout(token);
        logger.info(`[${FILE_NAME}] Logout service execution completed`);

        logger.info(`[${FILE_NAME}] Clearing authentication cookie`);
        res.clearCookie("jwt_access_token");
        logger.info(`[${FILE_NAME}] Cleared authentication cookie`);

        logger.success(`[${FILE_NAME}] Blog user logout completed successfully`);

        logger.info(`[${FILE_NAME}] Sending logout response to client`);
        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Blog user logout failed`, error);
        logger.warn(`[${FILE_NAME}] Logout request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Logout User Ends
// ============================================================




// ============================================================
// Controller Exports Starts
// ============================================================
module.exports = {
    blogUserRegistration,
    blogUserLogin,
    blogUserAccountDelete,
    blogUserLogout
};
// ============================================================
// Controller Exports Ends
// ============================================================