const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const ErrorMessage = require("../constants/error-message.constant.js");
const blogCommentRepository = require("../repositories/blog-comment.repository.js");
const devLogger = require("../utils/dev-logger.js");

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



const jwtPrivateKey = process.env.jwtPrivateKey;



// ============================================================
// Add New Blog Comment - starts
// ============================================================
async function addNewBlogComment(token, postID, newComment) {
    devLogger.info(`[${FILE_NAME}] Add new blog comment service started`);

    try {
        if(!token){
            devLogger.warn(`[${FILE_NAME}] Add comment request received without authentication token`);
            throw {
                status:401,
                message:ErrorMessage.NOT_AUTHENTICATED
            };
        }

        if(!postID){
            devLogger.warn(`[${FILE_NAME}] Add comment request received without post ID`);
            throw {
                status:400,
                message:ErrorMessage.POST_ID_REQUIRED
            };
        }

        if(!newComment || newComment.trim().length === 0){
            devLogger.warn(`[${FILE_NAME}] Blank comment cannot be added`);
            throw {
                status:406,
                message:ErrorMessage.BLANK_COMMENT
            };
        }

        devLogger.info(`[${FILE_NAME}] Verifying authentication token`);
        const userInformation = jwt.verify(token, jwtPrivateKey);
        devLogger.info(`[${FILE_NAME}] Authentication token verified successfully`);

        const userID = userInformation.id;

        if(!userID){
            devLogger.warn(`[${FILE_NAME}] Authentication token does not contain user ID`);
            throw {
                status:401,
                message:ErrorMessage.INVALID_AUTHENTICATION_TOKEN
            };
        }

        devLogger.info(`[${FILE_NAME}] Creating comment through repository`);

        await blogCommentRepository.createComment({
            commentDescription: newComment.trim(),
            commentDateTime: new Date(),
            userID: userID,
            postID: postID
        });

        devLogger.success(`[${FILE_NAME}] New blog comment added successfully`);
        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to add new blog comment`, error);
        throw error;
    }
};
// ============================================================
// Add New Blog Comment - ends
// ============================================================



// ============================================================
// Update Particular Comment - starts
// ============================================================
async function updateParticularComment(token, commentID, userID, updatedComment) {
    devLogger.info(`[${FILE_NAME}] Update particular comment service started`);

    try {
        if(!token){
            devLogger.warn(`[${FILE_NAME}] Update comment request received without authentication token`);
            throw {
                status:401,
                message:ErrorMessage.NOT_AUTHENTICATED
            };
        }

        if(!commentID){
            devLogger.warn(`[${FILE_NAME}] Update comment request received without comment ID`);
            throw {
                status:400,
                message:ErrorMessage.COMMENT_ID_REQUIRED
            };
        }

        if(!updatedComment || updatedComment.trim().length === 0){
            devLogger.warn(`[${FILE_NAME}] Blank updated comment cannot be saved`);
            throw {
                status:406,
                message:ErrorMessage.BLANK_COMMENT
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

        if(!userID){
            devLogger.warn(`[${FILE_NAME}] Update comment request received without user ID`);
            throw {
                status:400,
                message:ErrorMessage.USER_ID_REQUIRED
            };
        }

        if(userInformation.id != userID){
            devLogger.warn(`[${FILE_NAME}] User authentication failed for comment update`);
            throw {
                status:403,
                message:ErrorMessage.COMMENT_UPDATE_UNAUTHORIZED
            };
        }

        devLogger.info(`[${FILE_NAME}] Updating comment through repository`);
        await blogCommentRepository.updateComment(commentID, updatedComment.trim());

        devLogger.success(`[${FILE_NAME}] Particular blog comment updated successfully`);
        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to update particular blog comment`, error);
        throw error;
    }
};
// ============================================================
// Update Particular Comment - ends
// ============================================================



// ============================================================
// Delete Particular Comment - starts
// ============================================================
async function deleteParticularComment(token, commentID) {
    devLogger.info(`[${FILE_NAME}] Delete particular comment service started`);

    try {
        if(!token){
            devLogger.warn(`[${FILE_NAME}] Delete comment request received without authentication token`);
            throw {
                status:401,
                message:ErrorMessage.NOT_AUTHENTICATED
            };
        }

        if(!commentID){
            devLogger.warn(`[${FILE_NAME}] Delete comment request received without comment ID`);
            throw {
                status:400,
                message:ErrorMessage.COMMENT_ID_REQUIRED
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

        devLogger.info(`[${FILE_NAME}] Deleting comment through repository`);
        await blogCommentRepository.deleteComment(commentID);
        devLogger.success(`[${FILE_NAME}] Particular blog comment deleted successfully`);

        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete particular blog comment`, error);
        throw error;
    }
};
// ============================================================
// Delete Particular Comment - ends
// ============================================================



// ============================================================
// Get All Comments For Particular Blog - starts
// ============================================================
async function getAllCommentsForParticularBlog(postID) {
    devLogger.info(`[${FILE_NAME}] Get all comments for particular blog service started`);

    try {
        if(!postID){
            devLogger.warn(`[${FILE_NAME}] Get comments request received without post ID`);
            throw {
                status:400,
                message:ErrorMessage.POST_ID_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Fetching comments through repository`);
        const result = await blogCommentRepository.getCommentsByPostId(postID);
        devLogger.success(`[${FILE_NAME}] Blog comments fetched successfully`);

        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to get all comments for particular blog`, error);
        throw error;
    }
};
// ============================================================
// Get All Comments For Particular Blog - ends
// ============================================================



// ============================================================
// Delete All Comments By User ID - starts
// ============================================================
async function deleteAllCommentsByUserId(userID) {
    devLogger.info(`[${FILE_NAME}] Delete all comments by user service started`);

    try {
        if(!userID){
            devLogger.warn(`[${FILE_NAME}] Delete user comments request received without user ID`);
            throw {
                status:400,
                message:ErrorMessage.USER_ID_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Deleting user comments through repository`);
        await blogCommentRepository.deleteCommentsByUserId(userID);
        devLogger.success(`[${FILE_NAME}] All comments of user deleted successfully`);

        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete all comments by user ID`, error);
        throw error;
    }
};
// ============================================================
// Delete All Comments By User ID - ends
// ============================================================



// ============================================================
// Delete All Comments By Post ID - starts
// ============================================================
async function deleteAllCommentsByPostId(postID) {
    devLogger.info(`[${FILE_NAME}] Delete all comments by post service started`);

    try {
        if(!postID){
            devLogger.warn(`[${FILE_NAME}] Delete post comments request received without post ID`);
            throw {
                status:400,
                message:ErrorMessage.POST_ID_REQUIRED
            };
        }

        devLogger.info(`[${FILE_NAME}] Deleting post comments through repository`);
        await blogCommentRepository.deleteCommentsByPostId(postID);
        devLogger.success(`[${FILE_NAME}] All comments of post deleted successfully`);

        return true;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete all comments by post ID`, error);
        throw error;
    }
};
// ============================================================
// Delete All Comments By Post ID - ends
// ============================================================



// ============================================================
// Service Exports - starts
// ============================================================
module.exports = {
    addNewBlogComment,
    updateParticularComment,
    deleteParticularComment,
    getAllCommentsForParticularBlog,
    deleteAllCommentsByUserId,
    deleteAllCommentsByPostId
};
// ============================================================
// Service Exports - ends
// ============================================================
