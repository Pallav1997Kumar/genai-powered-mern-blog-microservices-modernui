const dotenv = require("dotenv");

const httpClient = require("../utils/httpClient.js");
const logger = require("../utils/logger.js");

const { 
    BLOG_COMMENT_SERVICE 
} = require("../config/services.js");


const FILE_NAME = "blog-comment.service.js";



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
// Add New Comment For Post Code Starts
// ============================================================
async function addNewCommentForPostId(postID, data, token) {

    if (process.env.environment == "DEVELOPMENT") {
        logger.info(`[${FILE_NAME}] Add new comment for post request started`);
    }

    try {

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Calling blog comment service to add new comment`);
        }

        const response = await httpClient.post(
            `${BLOG_COMMENT_SERVICE}/api/blog-comment/post/${postID}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Blog comment service returned add comment response successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.success(`[${FILE_NAME}] New comment added successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Returning add comment response`);
        }

        return response.data;
    }
    catch(error) {

        if (process.env.environment == "DEVELOPMENT") {
            logger.error(`[${FILE_NAME}] Failed to add comment`, error);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.warn(`[${FILE_NAME}] Add comment request could not be completed`);
        }

        throw {
            message: "Failed to add comment",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
}
// ============================================================
// Add New Comment For Post Code Ends
// ============================================================



// ============================================================
// Update Comment By Comment ID Code Starts
// ============================================================
async function updateCommentByCommentId(commentID, data, token) {

    if (process.env.environment == "DEVELOPMENT") {
        logger.info(`[${FILE_NAME}] Update comment by comment ID request started`);
    }

    try {

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Calling blog comment service to update comment`);
        }

        const response = await httpClient.put(
            `${BLOG_COMMENT_SERVICE}/api/blog-comment/comment/${commentID}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Blog comment service returned update comment response successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.success(`[${FILE_NAME}] Comment updated successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Returning update comment response`);
        }

        return response.data;
    }
    catch(error) {

        if (process.env.environment == "DEVELOPMENT") {
            logger.error(`[${FILE_NAME}] Failed to update comment`, error);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.warn(`[${FILE_NAME}] Update comment request could not be completed`);
        }

        throw {
            message: "Failed to update comment",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
}
// ============================================================
// Update Comment By Comment ID Code Ends
// ============================================================



// ============================================================
// Delete Comment By Comment ID Code Starts
// ============================================================
async function deleteCommentByCommentId(commentID, token) {

    if (process.env.environment == "DEVELOPMENT") {
        logger.warn(`[${FILE_NAME}] Delete comment by comment ID request started`);
    }

    try {

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Calling blog comment service to delete comment`);
        }

        const response = await httpClient.delete(
            `${BLOG_COMMENT_SERVICE}/api/blog-comment/comment/${commentID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Blog comment service returned delete comment response successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.success(`[${FILE_NAME}] Comment deleted successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Returning delete comment response`);
        }

        return response.data;
    }
    catch(error) {

        if (process.env.environment == "DEVELOPMENT") {
            logger.error(`[${FILE_NAME}] Failed to delete comment`, error);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.warn(`[${FILE_NAME}] Delete comment request could not be completed`);
        }

        throw {
            message: "Failed to delete comment",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
}
// ============================================================
// Delete Comment By Comment ID Code Ends
// ============================================================



// ============================================================
// Get All Comments By Post ID Code Starts
// ============================================================
async function getAllCommentsByPostId(postID) {

    if (process.env.environment == "DEVELOPMENT") {
        logger.info(`[${FILE_NAME}] Get all comments by post ID request started`);
    }

    try {

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Calling blog comment service to fetch all comments`);
        }

        const response = await httpClient.get(
            `${BLOG_COMMENT_SERVICE}/api/blog-comment/post/${postID}`
        );

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Blog comment service returned comments successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.success(`[${FILE_NAME}] All comments fetched successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Returning all comments response`);
        }

        return response.data;
    }
    catch(error) {

        if (process.env.environment == "DEVELOPMENT") {
            logger.error(`[${FILE_NAME}] Failed to fetch comments`, error);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.warn(`[${FILE_NAME}] Get all comments request could not be completed`);
        }

        throw {
            message: "Failed to fetch comments",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
}
// ============================================================
// Get All Comments By Post ID Code Ends
// ============================================================



// ============================================================
// Delete All Comments By User ID Code Starts
// ============================================================
async function deleteCommentsByUserId(userID, token) {

    if (process.env.environment == "DEVELOPMENT") {
        logger.warn(`[${FILE_NAME}] Delete all comments by user ID request started`);
    }

    try {

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Calling blog comment service to delete user's comments`);
        }

        const response = await httpClient.delete(
            `${BLOG_COMMENT_SERVICE}/api/blog-comment/user/${userID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Blog comment service returned delete user's comments response successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.success(`[${FILE_NAME}] User comments deleted successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Returning delete user's comments response`);
        }

        return response.data;
    }
    catch(error) {

        if (process.env.environment == "DEVELOPMENT") {
            logger.error(`[${FILE_NAME}] Failed to delete user's comments`, error);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.warn(`[${FILE_NAME}] Delete user's comments request could not be completed`);
        }

        throw {
            message: "Failed to delete user's comments",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
}
// ============================================================
// Delete All Comments By User ID Code Ends
// ============================================================



// ============================================================
// Delete All Comments By Post ID Code Starts
// ============================================================
async function deleteCommentsByPostId(postID, token) {

    if (process.env.environment == "DEVELOPMENT") {
        logger.warn(`[${FILE_NAME}] Delete all comments by post ID request started`);
    }

    try {

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Calling blog comment service to delete post comments`);
        }

        const response = await httpClient.delete(
            `${BLOG_COMMENT_SERVICE}/api/blog-comment/post/${postID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Blog comment service returned delete post comments response successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.success(`[${FILE_NAME}] Post comments deleted successfully`);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.info(`[${FILE_NAME}] Returning delete post comments response`);
        }

        return response.data;
    }
    catch(error) {

        if (process.env.environment == "DEVELOPMENT") {
            logger.error(`[${FILE_NAME}] Failed to delete post comments`, error);
        }

        if (process.env.environment == "DEVELOPMENT") {
            logger.warn(`[${FILE_NAME}] Delete post comments request could not be completed`);
        }

        throw {
            message: "Failed to delete post comments",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
}
// ============================================================
// Delete All Comments By Post ID Code Ends
// ============================================================



// ============================================================
// Service Exports
// ============================================================
module.exports = {
    addNewCommentForPostId,
    updateCommentByCommentId,
    deleteCommentByCommentId,
    getAllCommentsByPostId,
    deleteCommentsByUserId,
    deleteCommentsByPostId
};
// ============================================================
// Service Exports Ends
// ============================================================
