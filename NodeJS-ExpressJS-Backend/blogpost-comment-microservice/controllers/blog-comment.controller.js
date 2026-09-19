const dotenv = require("dotenv");

const blogCommentService = require("../services/blog-comment.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-comment.controller.js";



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
// Add New Blog Comment - starts
// ============================================================
async function addNewBlogComment(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Add new blog comment request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting authentication token and post ID`);
        }

        const token = req.headers.authorization?.split(" ")[1] || req.body.token;
        const postID = req.params.postID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting and preparing new comment`);
        }

        const newComment = req.body.newComment.trim();

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog comment service to add new comment`);
        }

        const result = await blogCommentService.addNewBlogComment(token, postID, newComment);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] New blog comment added successfully`);
            logger.info(`[${FILE_NAME}] Sending add comment response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to add new blog comment`, error);
            logger.warn(`[${FILE_NAME}] Add new blog comment request could not be completed`);
        }

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Add New Blog Comment - ends
// ============================================================



// ============================================================
// Update Particular Comment - starts
// ============================================================
async function updateParticularComment(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Update particular comment request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting authentication token, user ID and comment ID`);
        }

        const token = req.headers.authorization?.split(" ")[1] || req.body.token;
        const userID = req.body.userID;
        const commentID = req.params.commentID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting and preparing updated comment`);
        }

        const updatedComment = req.body.updatedComment.trim();

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog comment service to update comment`);
        }

        const result = await blogCommentService.updateParticularComment(token, commentID, userID, updatedComment);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Particular comment updated successfully`);
            logger.info(`[${FILE_NAME}] Sending update comment response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to update particular comment`, error);
            logger.warn(`[${FILE_NAME}] Update particular comment request could not be completed`);
        }

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Update Particular Comment - ends
// ============================================================



// ============================================================
// Delete Particular Comment - starts
// ============================================================
async function deleteParticularComment(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Delete particular comment request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting authentication token and comment ID`);
        }

        const token = req.headers.authorization?.split(" ")[1] || req.body.token;
        const commentID = req.params.commentID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog comment service to delete comment`);
        }

        const result = await blogCommentService.deleteParticularComment(token, commentID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Particular comment deleted successfully`);
            logger.info(`[${FILE_NAME}] Sending delete comment response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to delete particular comment`, error);
            logger.warn(`[${FILE_NAME}] Delete particular comment request could not be completed`);
        }

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Delete Particular Comment - ends
// ============================================================



// ============================================================
// Get All Comments For Particular Blog - starts
// ============================================================
async function getAllCommentsForParticularBlog(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get all comments for particular blog request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        }

        const postID = req.params.postID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog comment service to fetch comments`);
        }

        const result = await blogCommentService.getAllCommentsForParticularBlog(postID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] All blog comments fetched successfully`);
            logger.info(`[${FILE_NAME}] Sending comments response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch comments for particular blog`, error);
            logger.warn(`[${FILE_NAME}] Get comments request could not be completed`);
        }

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Get All Comments For Particular Blog - ends
// ============================================================



// ============================================================
// Delete All Comments By User ID - starts
// ============================================================
async function deleteAllCommentsByUserId(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Delete all comments by user ID request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        }

        const userID = req.params.userID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog comment service to delete user comments`);
        }

        const result = await blogCommentService.deleteAllCommentsByUserId(userID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] All comments by user deleted successfully`);
            logger.info(`[${FILE_NAME}] Sending delete user comments response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to delete all comments by user`, error);
            logger.warn(`[${FILE_NAME}] Delete user comments request could not be completed`);
        }

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Delete All Comments By User ID - ends
// ============================================================



// ============================================================
// Delete All Comments By Post ID - starts
// ============================================================
async function deleteAllCommentsByPostId(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Delete all comments by post ID request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        }

        const postID = req.params.postID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog comment service to delete post comments`);
        }

        const result = await blogCommentService.deleteAllCommentsByPostId(postID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] All comments by post deleted successfully`);
            logger.info(`[${FILE_NAME}] Sending delete post comments response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to delete all comments by post`, error);
            logger.warn(`[${FILE_NAME}] Delete post comments request could not be completed`);
        }

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Delete All Comments By Post ID - ends
// ============================================================



// ============================================================
// Controller Exports - starts
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
// Controller Exports - ends
// ============================================================
