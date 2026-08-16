const userService = require("../services/blog-user.service.js");
const blogPostLikeService = require("../services/blog-post-like.service.js");

const handleError = require("../utils/errorHandler.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-like.controller.js";



// ============================================================
// Blog Post Like Starts
// ============================================================
const blogPostLike = async function (req, res) {
    logger.info(`[${FILE_NAME}] Blog post like request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        logger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];

        logger.info(`[${FILE_NAME}] Calling blog post like service`);
        const result = await blogPostLikeService.blogPostLike(postID, token);

        logger.info(`[${FILE_NAME}] Blog post like service execution completed`);
        logger.success(`[${FILE_NAME}] Blog post liked successfully`);

        logger.info(`[${FILE_NAME}] Preparing like response`);
        logger.info(`[${FILE_NAME}] Sending like response to client`);

        return res.status(200).json(result);
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to like blog post`, error);
        logger.warn(`[${FILE_NAME}] Blog post like request could not be completed`);
        return handleError(res, error);
    }
};
// ============================================================
// Blog Post Like Ends
// ============================================================



// ============================================================
// Blog Post Unlike Starts
// ============================================================
const blogPostUnlike = async function (req, res) {
    logger.info(`[${FILE_NAME}] Blog post unlike request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        logger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];

        logger.info(`[${FILE_NAME}] Calling blog post unlike service`);
        const result = await blogPostLikeService.blogPostUnlike(postID, token);

        logger.info(`[${FILE_NAME}] Blog post unlike service execution completed`);
        logger.success(`[${FILE_NAME}] Blog post unliked successfully`);

        logger.info(`[${FILE_NAME}] Preparing unlike response`);
        logger.info(`[${FILE_NAME}] Sending unlike response to client`);

        return res.status(200).json(result);
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to unlike blog post`, error);
        logger.warn(`[${FILE_NAME}] Blog post unlike request could not be completed`);
        return handleError(res, error);
    }
};
// ============================================================
// Blog Post Unlike Ends
// ============================================================



// ============================================================
// Get All Likes For Particular Blog Starts
// ============================================================
const getAllLikesForParticularBlog = async function (req, res) {
    logger.info(`[${FILE_NAME}] Get all blog post likes request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        logger.info(`[${FILE_NAME}] Calling blog post like service to get all likes`);
        const likes = await blogPostLikeService.getAllLikesForParticularBlog(postID);

        logger.info(`[${FILE_NAME}] Blog post likes fetched successfully`);
        logger.info(`[${FILE_NAME}] Preparing likes with user details`);

        const likesWithUserDetails = await Promise.all(
            likes.map(async function (like) {
                logger.info(`[${FILE_NAME}] Fetching user details for like`);

                const userDetails = await userService.getUserByID(like.userID);

                logger.info(`[${FILE_NAME}] User details fetched successfully`);

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

        logger.info(`[${FILE_NAME}] Likes with user details prepared successfully`);

        const result = likesWithUserDetails;

        logger.success(`[${FILE_NAME}] All blog post likes fetched successfully`);

        logger.info(`[${FILE_NAME}] Preparing likes response`);
        logger.info(`[${FILE_NAME}] Sending likes response to client`);

        return res.status(200).json(result);
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to fetch blog post likes`, error);
        logger.warn(`[${FILE_NAME}] Get blog post likes request could not be completed`);
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