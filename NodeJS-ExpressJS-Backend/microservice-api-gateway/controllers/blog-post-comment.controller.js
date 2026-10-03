const blogCommentService = require("../services/blog-comment.service.js");
const userService = require("../services/blog-user.service.js");

const handleError = require("../utils/error-handler.js");
const devLogger = require("../utils/dev-logger.js");


const FILE_NAME = "blog-post-comment.controller.js";



// ============================================================
// Add New Blog Comment Starts
// ============================================================
async function addNewBlogComment (req, res) {
    devLogger.info(`[${FILE_NAME}] Add new blog comment request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;
        if (!postID) {
            devLogger.warn(`[${FILE_NAME}] Add comment request received without post ID`);
        }

        devLogger.info(`[${FILE_NAME}] Extracting comment request body`);
        const body = req.body;

        devLogger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = 
            req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            devLogger.warn(`[${FILE_NAME}] Add comment request received without authentication token`);
        }

        devLogger.info(`[${FILE_NAME}] Calling blog comment service to add new comment`);
        const result = await blogCommentService.addNewCommentForPostId(postID, body, token);
        devLogger.info(`[${FILE_NAME}] Blog comment service completed successfully`);
        devLogger.success(`[${FILE_NAME}] New blog comment added successfully`);

        devLogger.info(`[${FILE_NAME}] Sending add comment response to client`);
        return res.status(200).json(result);
    } 
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to add new blog comment`, error);
        devLogger.warn(`[${FILE_NAME}] Add comment request could not be completed`);
        return handleError(res, error);
    }
};
// ============================================================
// Add New Blog Comment Ends
// ============================================================



// ============================================================
// Update Particular Comment Starts
// ============================================================
async function updateParticularComment (req, res) {
    devLogger.info(`[${FILE_NAME}] Update blog comment request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting comment ID from request parameters`);
        const commentID = req.params.commentID;
        if (!commentID) {
            devLogger.warn(`[${FILE_NAME}] Update comment request received without comment ID`);
        }

        devLogger.info(`[${FILE_NAME}] Extracting comment update request body`);
        const body = req.body;

        devLogger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = 
            req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            devLogger.warn(`[${FILE_NAME}] Update comment request received without authentication token`);
        }

        devLogger.info(`[${FILE_NAME}] Calling blog comment service to update comment`);
        const result = await blogCommentService.updateCommentByCommentId(commentID, body, token);
        devLogger.info(`[${FILE_NAME}] Blog comment update service completed successfully`);
        devLogger.success(`[${FILE_NAME}] Blog comment updated successfully`);

        devLogger.info(`[${FILE_NAME}] Sending update comment response to client`);

        return res.status(200).json(result);
    } 
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to update blog comment`, error);
        devLogger.warn(`[${FILE_NAME}] Update comment request could not be completed`);
        return handleError(res, error);
    }
};
// ============================================================
// Update Particular Comment Ends
// ============================================================



// ============================================================
// Delete Particular Comment Starts
// ============================================================
async function deleteParticularComment (req, res) {
    devLogger.warn(`[${FILE_NAME}] Delete blog comment request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting comment ID from request parameters`);
        const commentID = req.params.commentID;
        if (!commentID) {
            devLogger.warn(`[${FILE_NAME}] Delete comment request received without comment ID`);
        }

        devLogger.info(`[${FILE_NAME}] Extracting comment deletion request body`);
        const body = req.body;

        devLogger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = 
            req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            devLogger.warn(`[${FILE_NAME}] Delete comment request received without authentication token`);
        }

        devLogger.info(`[${FILE_NAME}] Calling blog comment service to delete comment`);
        const result = await blogCommentService.deleteCommentByCommentId(commentID, body, token);
        devLogger.info(`[${FILE_NAME}] Blog comment deletion service completed successfully`);
        devLogger.success(`[${FILE_NAME}] Blog comment deleted successfully`);

        devLogger.info(`[${FILE_NAME}] Sending delete comment response to client`);

        return res.status(200).json(result);
    } 
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete blog comment`, error);
        devLogger.warn(`[${FILE_NAME}] Delete comment request could not be completed`);
        return handleError(res, error);
    }
};
// ============================================================
// Delete Particular Comment Ends
// ============================================================



// ============================================================
// Get All Comments For Particular Blog Starts
// ============================================================
async function getAllCommentsForParticularBlog(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get all blog comments request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;
        if (!postID) {
            devLogger.error(`[${FILE_NAME}] Get comments request received without post ID`);
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

        devLogger.info(`[${FILE_NAME}] Fetching all comments for blog post: ${postID}`);
        const blogPostCommentsResponse = await blogCommentService.getAllCommentsByPostId(postID);

        if(!blogPostCommentsResponse?.success) {
            devLogger.error(`[${FILE_NAME}] Failed to fetch comments: ${blogPostCommentsResponse?.errorMessage || "Failed to fetch comments"}`);
            throw blogPostCommentsResponse;
        }

        const blogPostComments = blogPostCommentsResponse.resultData || [];

        devLogger.info(`[${FILE_NAME}] ${blogPostComments.length} comments fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Preparing comments with user information`);

        const updatedBlogPostComments = await Promise.all(
            blogPostComments.map(async function(comment) {
                devLogger.info(`[${FILE_NAME}] Fetching user details for comment: ${comment._id}`);
                const userDetailsResponse = await userService.getUserByID(comment.userID);

                if(!userDetailsResponse?.success) {
                    devLogger.error(`[${FILE_NAME}] Failed to fetch user details for comment: ${comment._id}`);
                    throw userDetailsResponse;
                }

                const userDetails = userDetailsResponse.resultData;

                return {
                    _id: comment._id,
                    commentDescription: comment.commentDescription,
                    commentDateTime: comment.commentDateTime,
                    userID: comment.userID,
                    postID: comment.postID,
                    userDetails: {
                        fullName: userDetails.fullName,
                        username: userDetails.username,
                        userProfilePhoto: userDetails.userProfilePhoto
                    }
                };
            })
        );

        devLogger.info(`[${FILE_NAME}] Comments with user information prepared successfully`);
        devLogger.success(`[${FILE_NAME}] All blog comments fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending comments response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: "All blog comments fetched successfully",
            errorMessage: "",
            errorData: null,
            resultData: updatedBlogPostComments
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog comments with user information`, error);
        devLogger.warn(`[${FILE_NAME}] Get all blog comments request could not be completed`);
        return handleError(res, error);
    }
}
// ============================================================
// Get All Comments For Particular Blog Ends
// ============================================================




// ============================================================
// Controller Exports Starts
// ============================================================
module.exports = {
    addNewBlogComment,
    updateParticularComment,
    deleteParticularComment,
    getAllCommentsForParticularBlog
};
// ============================================================
// Controller Exports Ends
// ============================================================
