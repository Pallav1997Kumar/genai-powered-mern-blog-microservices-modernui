const userService = require("../services/blog-user.service.js");
const blogPostLikeService = require("../services/blog-post-like.service.js");

const handleError = require("../utils/errorHandler.js");
const devLogger = require("../utils/dev-logger.js");


const FILE_NAME = "blog-post-like.controller.js";



// ============================================================
// Blog Post Like Starts
// ============================================================
async function blogPostLike (req, res) {
    devLogger.info(`[${FILE_NAME}] Blog post like request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];

        devLogger.info(`[${FILE_NAME}] Calling blog post like service`);
        const result = await blogPostLikeService.blogPostLike(postID, token);
        devLogger.info(`[${FILE_NAME}] Blog post like service execution completed`);
        devLogger.success(`[${FILE_NAME}] Blog post liked successfully`);

        devLogger.info(`[${FILE_NAME}] Sending like response to client`);

        return res.status(200).json(result);
    } 
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to like blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Blog post like request could not be completed`);
        return handleError(res, error);
    }
};
// ============================================================
// Blog Post Like Ends
// ============================================================



// ============================================================
// Blog Post Unlike Starts
// ============================================================
async function blogPostUnlike (req, res) {
    devLogger.info(`[${FILE_NAME}] Blog post unlike request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];

        devLogger.info(`[${FILE_NAME}] Calling blog post unlike service`);
        const result = await blogPostLikeService.blogPostUnlike(postID, token);
        devLogger.info(`[${FILE_NAME}] Blog post unlike service execution completed`);
        devLogger.success(`[${FILE_NAME}] Blog post unliked successfully`);

        devLogger.info(`[${FILE_NAME}] Sending unlike response to client`);

        return res.status(200).json(result);
    } 
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to unlike blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Blog post unlike request could not be completed`);
        return handleError(res, error);
    }
};
// ============================================================
// Blog Post Unlike Ends
// ============================================================



// ============================================================
// Get All Likes For Particular Blog Starts
// ============================================================
async function getAllLikesForParticularBlog (req, res) {
    devLogger.info(`[${FILE_NAME}] Get all blog post likes request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Calling blog post like service to get all likes`);
        const likes = await blogPostLikeService.getAllLikesForParticularBlog(postID);
        devLogger.info(`[${FILE_NAME}] Blog post likes fetched successfully`);

        devLogger.info(`[${FILE_NAME}] Preparing likes with user details`);

        const likesWithUserDetails = await Promise.all(
            likes.map(async function (like) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for like`);
                const userDetails = await userService.getUserByID(like.userID);
                devLogger.info(`[${FILE_NAME}] User details fetched successfully`);

                return {
                    _id: like._id,
                    userID: like.userID,
                    postID: like.postID,
                    userDetails: {
                        fullName: userDetails.fullName,
                        username: userDetails.username,
                        userProfilePhoto: userDetails.userProfilePhoto
                    }
                }
            })
        );

        devLogger.info(`[${FILE_NAME}] Likes with user details prepared successfully`);
        const result = likesWithUserDetails;
        devLogger.success(`[${FILE_NAME}] All blog post likes fetched successfully`);

        devLogger.info(`[${FILE_NAME}] Sending likes response to client`);

        return res.status(200).json(result);
    } 
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog post likes`, error);
        devLogger.warn(`[${FILE_NAME}] Get blog post likes request could not be completed`);
        return handleError(res, error);
    }
};
// ============================================================
// Get All Likes For Particular Blog Ends
// ============================================================




// ============================================================
// Controller Exports Starts
// ============================================================
module.exports = {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog
};
// ============================================================
// Controller Exports Starts
// ============================================================
