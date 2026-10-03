const userService = require("../services/blog-user.service.js");
const blogPostService = require("../services/blog-post.service.js");
const blogCommentService = require("../services/blog-comment.service.js");
const blogLikeService = require("../services/blog-post-like.service.js");

const handleError = require("../utils/error-handler.js");
const devLogger = require("../utils/dev-logger.js");


const FILE_NAME = "authorization.controller.js";



// ============================================================
// ============================================================
// Blog User Registration Starts
// ============================================================
async function blogUserRegistration(req,res){
    devLogger.info(`[${FILE_NAME}] Blog user registration request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting registration request body`);
        const body = req.body;

        devLogger.info(`[${FILE_NAME}] Calling user service for registration`);
        const registerUserResult = await userService.registerUser(body);

        devLogger.success(`[${FILE_NAME}] Blog user registration completed successfully`);
        devLogger.info(`[${FILE_NAME}] Sending registration response to client`);
        
        return res.status(200).json({
            success: true,
            error: false,
            successMessage: registerUserResult.successMessage,
            errorMessage: "",
            errorData: null,
            resultData: registerUserResult.resultData
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Blog user registration failed: `, error);
        devLogger.warn(`[${FILE_NAME}] Registration request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Blog User Registration Ends
// ============================================================



// ============================================================
// Blog User Login Starts
// ============================================================
async function blogUserLogin(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Blog user login request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting login request body`);
        const body = req.body;

        devLogger.info(`[${FILE_NAME}] Calling user service for login`);
        const loginUserResult = await userService.loginUser(body);
        
        devLogger.info(`[${FILE_NAME}] Login service execution completed`);

        if(loginUserResult.cookies) {
            devLogger.info(`[${FILE_NAME}] Authentication cookie received from login service`);
            res.setHeader("Set-Cookie", loginUserResult.cookies);
            devLogger.success(`[${FILE_NAME}] Authentication cookie attached to response`);
        }
        else {
            devLogger.warn(`[${FILE_NAME}] Login completed without authentication cookie`);
        }

        devLogger.success(`[${FILE_NAME}] Blog user login completed successfully`);
        devLogger.info(`[${FILE_NAME}] Sending login response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: loginUserResult.data.successMessage,
            errorMessage: "",
            errorData: null,
            resultData: loginUserResult.data.resultData
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Blog user login failed: `, error);
        devLogger.warn(`[${FILE_NAME}] Login request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Blog User Login Ends
// ============================================================



// ============================================================
// Delete User Account Starts
// ============================================================
async function blogUserAccountDelete(req, res, next) {
    devLogger.warn(`[${FILE_NAME}] Blog user account deletion request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting authentication token from request headers`);

        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        if(!token) {
            devLogger.warn(`[${FILE_NAME}] Account deletion requested without authentication token`);
            throw {
                success: false,
                error: true,
                successMessage: "",
                errorMessage: "Authentication token is required",
                errorData: null,
                resultData: null,
                status: 401
            };
        }
        devLogger.info(`[${FILE_NAME}] Authentication token extracted successfully`);

        devLogger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        if(!userID) {
            devLogger.warn(`[${FILE_NAME}] Account deletion requested without user ID`);
            throw {
                success: false,
                error: true,
                successMessage: "",
                errorMessage: "User ID is required",
                errorData: null,
                resultData: null,
                status: 400
            };
        }

        devLogger.info(`[${FILE_NAME}] User ID extracted successfully: ${userID}`);
        devLogger.info(`[${FILE_NAME}] Starting deletion of all user blog related data for user: ${userID}`);

        devLogger.info(`[${FILE_NAME}] Deleting all comments by user: ${userID}`);
        const deleteUserCommentsResponse = await blogCommentService.deleteCommentsByUserId(userID, token);

        if(!deleteUserCommentsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to delete user comments: ${deleteUserCommentsResponse?.errorMessage || "Failed to delete user comments"}`);
            throw deleteUserCommentsResponse;
        }

        devLogger.info(`[${FILE_NAME}] All user comments deleted successfully`);
        devLogger.success(`[${FILE_NAME}] User comments deletion completed successfully`);

        devLogger.info(`[${FILE_NAME}] Deleting all likes by user: ${userID}`);
        const deleteUserLikesResponse = await blogLikeService.deleteLikesByUserId(userID, token);

        if(!deleteUserLikesResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to delete user likes: ${deleteUserLikesResponse?.errorMessage || "Failed to delete user likes"}`);
            throw deleteUserLikesResponse;
        }

        devLogger.info(`[${FILE_NAME}] All user likes deleted successfully`);
        devLogger.success(`[${FILE_NAME}] User likes deletion completed successfully`);

        devLogger.info(`[${FILE_NAME}] Fetching all blog post IDs for user: ${userID}`);
        const blogPostIdsByUserId = await blogPostService.getAllBlogPostIdsByUserId(userID);

        if(!blogPostIdsByUserId) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch blog post IDs for user: ${userID}`);
            throw {
                success: false,
                error: true,
                successMessage: "",
                errorMessage: "Failed to fetch user blog post IDs",
                errorData: null,
                resultData: null,
                status: 500
            };
        }

        devLogger.info(`[${FILE_NAME}] Received blog post IDs for user: ${userID}. Total posts: ${blogPostIdsByUserId.length}`);
        devLogger.success(`[${FILE_NAME}] Blog post IDs fetched successfully`);

        for(const post of blogPostIdsByUserId) {
            const postID = post._id;
            devLogger.info(`[${FILE_NAME}] Processing deletion for blog post: ${postID}`);

            devLogger.info(`[${FILE_NAME}] Deleting all likes for post: ${postID}`);
            const deleteAllLikesByPostIdResponse = await blogLikeService.deleteAllLikesForPost(postID, token);

            if(!deleteAllLikesByPostIdResponse?.success) {
                devLogger.error(`[${FILE_NAME}] Failed to delete likes for post: ${postID}`);
                throw deleteAllLikesByPostIdResponse;
            }

            devLogger.info(`[${FILE_NAME}] All likes deleted successfully for post: ${postID}`);
            devLogger.success(`[${FILE_NAME}] Blog likes deletion completed successfully`);

            devLogger.info(`[${FILE_NAME}] Deleting all comments for post: ${postID}`);
            const deleteAllCommentsByPostIdResponse = await blogCommentService.deleteCommentsByPostId(postID, token);

            if(!deleteAllCommentsByPostIdResponse?.success) {
                devLogger.error(`[${FILE_NAME}] Failed to delete comments for post: ${postID}`);
                throw deleteAllCommentsByPostIdResponse;
            }

            devLogger.info(`[${FILE_NAME}] All comments deleted successfully for post: ${postID}`);
            devLogger.success(`[${FILE_NAME}] Blog comments deletion completed successfully`);
        }

        devLogger.info(`[${FILE_NAME}] Deleting all blog posts for user: ${userID}`);
        const deleteUserBlogsResponse = await blogPostService.deleteBlogPostsByUser(userID, token);

        if(!deleteUserBlogsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to delete user blog posts: ${deleteUserBlogsResponse?.errorMessage || "Failed to delete user blog posts"}`);
            throw deleteUserBlogsResponse;
        }

        devLogger.info(`[${FILE_NAME}] All user blog posts deleted successfully`);
        devLogger.success(`[${FILE_NAME}] User blog posts deletion completed successfully`);

        devLogger.info(`[${FILE_NAME}] Calling user service for account deletion`);
        const deleteUserResponse = await userService.deleteUser(userID, token);

        if(!deleteUserResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to delete user account: ${deleteUserResponse?.errorMessage || "Failed to delete user account"}`);
            throw deleteUserResponse;
        }

        devLogger.info(`[${FILE_NAME}] User account deleted successfully`);
        devLogger.success(`[${FILE_NAME}] User service completed account deletion`);

        devLogger.info(`[${FILE_NAME}] Clearing authentication cookie`);
        res.clearCookie("jwt_access_token");
        devLogger.info(`[${FILE_NAME}] Authentication cookie cleared successfully`);

        devLogger.success(`[${FILE_NAME}] Blog user account deleted successfully`);
        devLogger.info(`[${FILE_NAME}] Sending account deletion response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: deleteUserResponse.successMessage,
            errorMessage: "",
            errorData: null,
            resultData: deleteUserResponse.resultData
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Blog user account deletion failed`, error);
        devLogger.warn(`[${FILE_NAME}] Account deletion request could not be completed`);
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
    devLogger.info(`[${FILE_NAME}] Blog user logout request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting authentication token from cookies`);
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        if (!token) {
            devLogger.warn(`[${FILE_NAME}] Logout requested without authentication token`);
        }

        devLogger.info(`[${FILE_NAME}] Calling user service for logout`);
        const logoutUserResult = await userService.logout(token);
        devLogger.info(`[${FILE_NAME}] Logout service execution completed`);

        devLogger.info(`[${FILE_NAME}] Clearing authentication cookie`);
        res.clearCookie("jwt_access_token");
        devLogger.info(`[${FILE_NAME}] Cleared authentication cookie`);

        devLogger.success(`[${FILE_NAME}] Blog user logout completed successfully`);
        devLogger.info(`[${FILE_NAME}] Sending logout response to client`);
        
        return res.status(200).json({
            success: true,
            error: false,
            successMessage: logoutUserResult.successMessage,
            errorMessage: "",
            errorData: null,
            resultData: logoutUserResult.resultData
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Blog user logout failed`, error);
        devLogger.warn(`[${FILE_NAME}] Logout request could not be completed`);
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
