const userService = require("../services/blog-user.service.js");
const blogPostLikeService = require("../services/blog-post-like.service.js");

const handleError = require("../utils/error-handler.js");
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
async function getAllLikesForParticularBlog(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get all blog post likes request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        if (!postID) {
            devLogger.warn(`[${FILE_NAME}] Get likes request received without post ID`);
            throw {
                success: false,
                error: true,
                successMessage: "",
                errorMessage: "Post ID is required",
                errorData: null,
                resultData: null,
                status: 400
            };
        }

        devLogger.info(`[${FILE_NAME}] Fetching all likes for blog post: ${postID}`);

        const blogPostLikesResponse = await blogPostLikeService.getAllLikesForParticularBlog(postID);

        if(!blogPostLikesResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch likes: ${blogPostLikesResponse?.errorMessage || "Failed to fetch likes"}`);
            throw blogPostLikesResponse;
        }

        const blogPostLikes = blogPostLikesResponse.resultData || [];

        devLogger.info(`[${FILE_NAME}] ${blogPostLikes.length} likes fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing likes with user information`);

        const updatedLikes = await Promise.all(
            blogPostLikes.map(async function(like) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for like: ${like._id}`);
                const userDetailsResponse = await userService.getUserByID(like.userID);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for like: ${like._id}`);
                    throw userDetailsResponse;
                }

                const userDetails = userDetailsResponse.resultData;

                return {
                    _id: like._id,
                    userID: like.userID,
                    postID: like.postID,
                    userDetails: {
                        fullName: userDetails.fullName,
                        username: userDetails.username,
                        userProfilePhoto: userDetails.userProfilePhoto
                    }
                };
            })
        );

        devLogger.info(`[${FILE_NAME}] Likes with user information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] All blog post likes fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending likes response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "All blog post likes fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: updatedLikes
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog post likes with user information`, error);
        devLogger.warn(`[${FILE_NAME}] Get blog post likes request could not be completed`);
        return handleError(res, error);
    }
}
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
