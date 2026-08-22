const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const blogCommentRepository = require("../repositories/blog-comment.repository.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-comment.service.js";

dotenv.config({path:"./config.env"});

const jwtPrivateKey = process.env.jwtPrivateKey;



// ============================================================
// Add New Blog Comment - starts
// ============================================================
async function addNewBlogComment(token, postID, newComment) {
    logger.info(`[${FILE_NAME}] Add new blog comment service started`);

    try {
        if(!token){
            logger.warn(`[${FILE_NAME}] Add comment request received without authentication token`);
            throw {
                status:401,
                message:"Not Authenticated"
            };
        }

        logger.info(`[${FILE_NAME}] Verifying authentication token`);
        const userInformation = jwt.verify(token,jwtPrivateKey);
        logger.info(`[${FILE_NAME}] Authentication token verified successfully`);

        const userID = userInformation.id;

        if(newComment === "" || newComment == null || newComment == undefined){
            logger.warn(`[${FILE_NAME}] Blank comment cannot be added`);
            throw {
                status:406,
                message:"Blank comment cannot be added."
            };
        }

        logger.info(`[${FILE_NAME}] Creating comment through repository`);

        await blogCommentRepository.createComment({
            commentDescription: newComment,
            commentDateTime: new Date(),
            userID: userID,
            postID: postID
        });

        logger.success(`[${FILE_NAME}] New blog comment added successfully`);
        return "Commented on the post successfully";
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to add new blog comment`, error);
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
    logger.info(`[${FILE_NAME}] Update particular comment service started`);

    try {
        if(!token){
            logger.warn(`[${FILE_NAME}] Update comment request received without authentication token`);
            throw {
                status:401,
                message:"Not Authenticated"
            };
        }

        logger.info(`[${FILE_NAME}] Verifying authentication token`);
        const userInformation = jwt.verify(token,jwtPrivateKey);
        logger.info(`[${FILE_NAME}] Authentication token verified successfully`);

        if(userInformation.id != userID){
            logger.warn(`[${FILE_NAME}] User authentication failed for comment update`);
            throw {
                status:401,
                message:"Not Authenticated"
            };
        }

        if(updatedComment === "" || updatedComment == null || updatedComment == undefined){
            logger.warn(`[${FILE_NAME}] Blank updated comment cannot be saved`);
            throw {
                status:406,
                message:"Blank comment cannot be added."
            };
        }

        logger.info(`[${FILE_NAME}] Updating comment through repository`);
        await blogCommentRepository.updateComment(commentID, updatedComment);

        logger.success(`[${FILE_NAME}] Particular blog comment updated successfully`);
        return "Comment on the post updated successfully";
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to update particular blog comment`, error);
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
    logger.info(`[${FILE_NAME}] Delete particular comment service started`);

    try {
        if(!token){
            logger.warn(`[${FILE_NAME}] Delete comment request received without authentication token`);
            throw {
                status:401,
                message:"Not Authenticated"
            };
        }

        logger.info(`[${FILE_NAME}] Deleting comment through repository`);
        await blogCommentRepository.deleteComment(commentID);

        logger.success(`[${FILE_NAME}] Particular blog comment deleted successfully`);
        return "Comment on the post deleted successfully";
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to delete particular blog comment`, error);
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
    logger.info(`[${FILE_NAME}] Get all comments for particular blog service started`);

    try {
       logger.info(`[${FILE_NAME}] Fetching comments through repository`);
        const result = await blogCommentRepository.getCommentsByPostId(postID);

        logger.success(`[${FILE_NAME}] Blog comments fetched successfully`);
        return result; 
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to get all comments for particular blog`, error);
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
    logger.info(`[${FILE_NAME}] Delete all comments by user service started`);

    try {
        logger.info(`[${FILE_NAME}] Deleting user comments through repository`);
        await blogCommentRepository.deleteCommentsByUserId(userID);

        logger.success(`[${FILE_NAME}] All comments of user deleted successfully`);
        return "All comments of user deleted successfully";
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to delete all comments by user ID`, error);
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
    logger.info(`[${FILE_NAME}] Delete all comments by post service started`);

    try {
        logger.info(`[${FILE_NAME}] Deleting post comments through repository`);
        await blogCommentRepository.deleteCommentsByPostId(postID);

        logger.success(`[${FILE_NAME}] All comments of post deleted successfully`);
        return "All comments of post deleted successfully";
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to delete all comments by post ID`, error);
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