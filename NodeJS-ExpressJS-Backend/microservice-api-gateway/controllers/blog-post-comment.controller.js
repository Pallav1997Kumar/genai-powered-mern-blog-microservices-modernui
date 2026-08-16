const blogCommentService = require("../services/blog-comment.service.js");
const userService = require("../services/blog-user.service.js");

const handleError = require("../utils/errorHandler.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-comment.controller.js";



// ============================================================
// Add New Blog Comment Starts
// ============================================================
const addNewBlogComment = async function (req, res) {
    logger.info(`[${FILE_NAME}] Add new blog comment request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        logger.info(`[${FILE_NAME}] Extracting comment request body`);
        const body = req.body;

        logger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = 
            req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];

        if (!postID) {
            logger.warn(`[${FILE_NAME}] Add comment request received without post ID`);
        }

        if (!token) {
            logger.warn(`[${FILE_NAME}] Add comment request received without authentication token`);
        }

        logger.info(`[${FILE_NAME}] Calling blog comment service to add new comment`);
        const result = await blogCommentService.addNewCommentForPostId(postID, body, token);

        logger.info(`[${FILE_NAME}] Blog comment service completed successfully`);
        logger.success(`[${FILE_NAME}] New blog comment added successfully`);

        logger.info(`[${FILE_NAME}] Preparing add comment response`);
        logger.info(`[${FILE_NAME}] Sending add comment response to client`);

        return res.status(200).json(result);
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to add new blog comment`, error);
        logger.warn(`[${FILE_NAME}] Add comment request could not be completed`);
        return handleError(res, error);
    }
};
// ============================================================
// Add New Blog Comment Ends
// ============================================================



// ============================================================
// Update Particular Comment Starts
// ============================================================
const updateParticularComment = async function (req, res) {
    logger.info(`[${FILE_NAME}] Update blog comment request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting comment ID from request parameters`);
        const commentID = req.params.commentID;

        logger.info(`[${FILE_NAME}] Extracting comment update request body`);
        const body = req.body;

        logger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = 
            req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];

        if (!commentID) {
            logger.warn(`[${FILE_NAME}] Update comment request received without comment ID`);
        }

        if (!token) {
            logger.warn(`[${FILE_NAME}] Update comment request received without authentication token`);
        }

        logger.info(`[${FILE_NAME}] Calling blog comment service to update comment`);
        const result = await blogCommentService.updateCommentByCommentId(commentID, body, token);

        logger.info(`[${FILE_NAME}] Blog comment update service completed successfully`);
        logger.success(`[${FILE_NAME}] Blog comment updated successfully`);

        logger.info(`[${FILE_NAME}] Preparing update comment response`);
        logger.info(`[${FILE_NAME}] Sending update comment response to client`);

        return res.status(200).json(result);
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to update blog comment`, error);
        logger.warn(`[${FILE_NAME}] Update comment request could not be completed`);
        return handleError(res, error);
    }
};
// ============================================================
// Update Particular Comment Ends
// ============================================================



// ============================================================
// Delete Particular Comment Starts
// ============================================================
const deleteParticularComment = async function (req, res) {
    logger.warn(`[${FILE_NAME}] Delete blog comment request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting comment ID from request parameters`);
        const commentID = req.params.commentID;

        logger.info(`[${FILE_NAME}] Extracting comment deletion request body`);
        const body = req.body;

        logger.info(`[${FILE_NAME}] Extracting authentication token`);
        const token = 
            req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];

        if (!commentID) {
            logger.warn(`[${FILE_NAME}] Delete comment request received without comment ID`);
        }

        if (!token) {
            logger.warn(`[${FILE_NAME}] Delete comment request received without authentication token`);
        }

        logger.info(`[${FILE_NAME}] Calling blog comment service to delete comment`);
        const result = await blogCommentService.deleteCommentByCommentId(commentID, body, token);

        logger.info(`[${FILE_NAME}] Blog comment deletion service completed successfully`);
        logger.success(`[${FILE_NAME}] Blog comment deleted successfully`);

        logger.info(`[${FILE_NAME}] Preparing delete comment response`);
        logger.info(`[${FILE_NAME}] Sending delete comment response to client`);

        return res.status(200).json(result);
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to delete blog comment`, error);
        logger.warn(`[${FILE_NAME}] Delete comment request could not be completed`);
        return handleError(res, error);
    }
};
// ============================================================
// Delete Particular Comment Ends
// ============================================================



// ============================================================
// Get All Comments For Particular Blog Starts
// ============================================================
const getAllCommentsForParticularBlog = async function (req, res) {
    logger.info(`[${FILE_NAME}] Get all blog comments request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        if (!postID) {
            logger.warn(`[${FILE_NAME}] Get comments request received without post ID`);
        }

        logger.info(`[${FILE_NAME}] Calling blog comment service to get all comments`);
        const comments = await blogCommentService.getAllCommentsByPostId(postID);

        logger.info(`[${FILE_NAME}] Blog comment service returned comments successfully`);
        logger.info(`[${FILE_NAME}] Preparing comments with user details`);

        const commentsWithUserDetails = await Promise.all(
            comments.map(async function (comment) {

                logger.info(`[${FILE_NAME}] Fetching user details for comment`);

                const userDetails = await userService.getUserByID(comment.userID);

                logger.info(`[${FILE_NAME}] User details fetched for comment successfully`);

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

        logger.info(`[${FILE_NAME}] Comments with user details prepared successfully`);

        const result = commentsWithUserDetails;

        logger.success(`[${FILE_NAME}] All blog comments fetched successfully`);

        logger.info(`[${FILE_NAME}] Preparing comments response`);
        logger.info(`[${FILE_NAME}] Sending comments response to client`);

        return res.status(200).json(result);
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to fetch blog comments`, error);
        logger.warn(`[${FILE_NAME}] Get comments request could not be completed`);
        return handleError(res, error);
    }
};
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