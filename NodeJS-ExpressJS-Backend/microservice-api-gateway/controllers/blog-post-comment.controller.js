const dotenv = require("dotenv");

const blogCommentService = require("../services/blog-comment.service.js");
const userService = require("../services/blog-user.service.js");

const handleError = require("../utils/errorHandler.js");
const logger = require("../utils/logger.js");


const FILE_NAME = "blog-post-comment.controller.js";



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



// ============================================================
// Add New Blog Comment Starts
// ============================================================
async function addNewBlogComment (req, res) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Add new blog comment request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        }
        const postID = req.params.postID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting comment request body`);
        }
        const body = req.body;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting authentication token`);
        }
        const token = 
            req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];

        if (!postID) {
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Add comment request received without post ID`);
            }
        }

        if (!token) {
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Add comment request received without authentication token`);
            }
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog comment service to add new comment`);
        }
        const result = await blogCommentService.addNewCommentForPostId(postID, body, token);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog comment service completed successfully`);
            logger.success(`[${FILE_NAME}] New blog comment added successfully`);

            logger.info(`[${FILE_NAME}] Preparing add comment response`);
            logger.info(`[${FILE_NAME}] Sending add comment response to client`);
        }

        return res.status(200).json(result);
    } 
    catch (error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to add new blog comment`, error);
            logger.warn(`[${FILE_NAME}] Add comment request could not be completed`);
        }
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
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Update blog comment request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting comment ID from request parameters`);
        }
        const commentID = req.params.commentID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting comment update request body`);
        }
        const body = req.body;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting authentication token`);
        }
        const token = 
            req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];

        if (!commentID) {
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Update comment request received without comment ID`);
            }
        }

        if (!token) {
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Update comment request received without authentication token`);
            }
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog comment service to update comment`);
        }
        const result = await blogCommentService.updateCommentByCommentId(commentID, body, token);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog comment update service completed successfully`);
            logger.success(`[${FILE_NAME}] Blog comment updated successfully`);

            logger.info(`[${FILE_NAME}] Preparing update comment response`);
            logger.info(`[${FILE_NAME}] Sending update comment response to client`);
        }

        return res.status(200).json(result);
    } 
    catch (error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to update blog comment`, error);
            logger.warn(`[${FILE_NAME}] Update comment request could not be completed`);
        }
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
    if(process.env.environment == "DEVELOPMENT"){
        logger.warn(`[${FILE_NAME}] Delete blog comment request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting comment ID from request parameters`);
        }
        const commentID = req.params.commentID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting comment deletion request body`);
        }
        const body = req.body;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting authentication token`);
        }
        const token = 
            req.body.token || req.cookies?.jwt_access_token || req.headers.authorization?.split(" ")[1];

        if (!commentID) {
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Delete comment request received without comment ID`);
            }
        }

        if (!token) {
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Delete comment request received without authentication token`);
            }
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog comment service to delete comment`);
        }
        const result = await blogCommentService.deleteCommentByCommentId(commentID, body, token);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog comment deletion service completed successfully`);
            logger.success(`[${FILE_NAME}] Blog comment deleted successfully`);

            logger.info(`[${FILE_NAME}] Preparing delete comment response`);
            logger.info(`[${FILE_NAME}] Sending delete comment response to client`);
        }

        return res.status(200).json(result);
    } 
    catch (error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to delete blog comment`, error);
            logger.warn(`[${FILE_NAME}] Delete comment request could not be completed`);
        }
        return handleError(res, error);
    }
};
// ============================================================
// Delete Particular Comment Ends
// ============================================================



// ============================================================
// Get All Comments For Particular Blog Starts
// ============================================================
async function getAllCommentsForParticularBlog (req, res) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get all blog comments request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        }
        const postID = req.params.postID;

        if (!postID) {
            if(process.env.environment == "DEVELOPMENT"){
                logger.warn(`[${FILE_NAME}] Get comments request received without post ID`);
            }
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog comment service to get all comments`);
        }
        const comments = await blogCommentService.getAllCommentsByPostId(postID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog comment service returned comments successfully`);
            logger.info(`[${FILE_NAME}] Preparing comments with user details`);
        }

        const commentsWithUserDetails = await Promise.all(
            comments.map(async function (comment) {

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] Fetching user details for comment`);
                }

                const userDetails = await userService.getUserByID(comment.userID);

                if(process.env.environment == "DEVELOPMENT"){
                    logger.info(`[${FILE_NAME}] User details fetched for comment successfully`);
                }

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

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Comments with user details prepared successfully`);
        }

        const result = commentsWithUserDetails;

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] All blog comments fetched successfully`);

            logger.info(`[${FILE_NAME}] Preparing comments response`);
            logger.info(`[${FILE_NAME}] Sending comments response to client`);
        }

        return res.status(200).json(result);
    } 
    catch (error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch blog comments`, error);
            logger.warn(`[${FILE_NAME}] Get comments request could not be completed`);
        }
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
