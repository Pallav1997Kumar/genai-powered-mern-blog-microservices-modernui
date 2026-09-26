const SuccessMessage = require("../constants/success-message.constant.js");
const blogCommentService = require("../services/blog-comment.service.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-comment.controller.js";



// ============================================================
// Add New Blog Comment - starts
// ============================================================
async function addNewBlogComment(req,res){
    devLogger.info(`[${FILE_NAME}] Add new blog comment request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting authentication token and post ID`);

        const token = req.headers.authorization?.split(" ")[1] || req.body.token;
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Extracting and preparing new comment`);
        const newComment = req.body.newComment.trim();

        devLogger.info(`[${FILE_NAME}] Calling blog comment service to add new comment`);
        const result = await blogCommentService.addNewBlogComment(token, postID, newComment);

        devLogger.success(`[${FILE_NAME}] New blog comment added successfully`);
        devLogger.info(`[${FILE_NAME}] Sending add comment response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: SuccessMessage.COMMENT_CREATED,
            errorMessage: "",
            resultData: null
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to add new blog comment`, error);
        devLogger.warn(`[${FILE_NAME}] Add new blog comment request could not be completed`);

        return res.status(error.status || 500).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: error.message,
            resultData: null
        });
    }
};
// ============================================================
// Add New Blog Comment - ends
// ============================================================



// ============================================================
// Update Particular Comment - starts
// ============================================================
async function updateParticularComment(req,res){
    devLogger.info(`[${FILE_NAME}] Update particular comment request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting authentication token, user ID and comment ID`);

        const token = req.headers.authorization?.split(" ")[1] || req.body.token;
        const userID = req.body.userID;
        const commentID = req.params.commentID;

        devLogger.info(`[${FILE_NAME}] Extracting and preparing updated comment`);
        const updatedComment = req.body.updatedComment.trim();

        devLogger.info(`[${FILE_NAME}] Calling blog comment service to update comment`);
        const result = await blogCommentService.updateParticularComment(token, commentID, userID, updatedComment);

        devLogger.success(`[${FILE_NAME}] Particular comment updated successfully`);
        devLogger.info(`[${FILE_NAME}] Sending update comment response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: SuccessMessage.COMMENT_UPDATED,
            errorMessage: "",
            resultData: null
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to update particular comment`, error);
        devLogger.warn(`[${FILE_NAME}] Update particular comment request could not be completed`);

        return res.status(error.status || 500).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: error.message,
            resultData: null
        });
    }
};
// ============================================================
// Update Particular Comment - ends
// ============================================================



// ============================================================
// Delete Particular Comment - starts
// ============================================================
async function deleteParticularComment(req,res){
    devLogger.info(`[${FILE_NAME}] Delete particular comment request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting authentication token and comment ID`);

        const token = req.headers.authorization?.split(" ")[1] || req.body.token;
        const commentID = req.params.commentID;

        devLogger.info(`[${FILE_NAME}] Calling blog comment service to delete comment`);
        const result = await blogCommentService.deleteParticularComment(token, commentID);

        devLogger.success(`[${FILE_NAME}] Particular comment deleted successfully`);
        devLogger.info(`[${FILE_NAME}] Sending delete comment response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: SuccessMessage.COMMENT_DELETED,
            errorMessage: "",
            resultData: null
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to delete particular comment`, error);
        devLogger.warn(`[${FILE_NAME}] Delete particular comment request could not be completed`);

        return res.status(error.status || 500).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: error.message,
            resultData: null
        });
    }
};
// ============================================================
// Delete Particular Comment - ends
// ============================================================



// ============================================================
// Get All Comments For Particular Blog - starts
// ============================================================
async function getAllCommentsForParticularBlog(req,res){
    devLogger.info(`[${FILE_NAME}] Get all comments for particular blog request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Calling blog comment service to fetch comments`);
        const result = await blogCommentService.getAllCommentsForParticularBlog(postID);

        devLogger.success(`[${FILE_NAME}] All blog comments fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending comments response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: SuccessMessage.COMMENTS_FETCHED,
            errorMessage: "",
            resultData: result
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to fetch comments for particular blog`, error);
        devLogger.warn(`[${FILE_NAME}] Get comments request could not be completed`);

        return res.status(error.status || 500).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: error.message,
            resultData: null
        });
    }
};
// ============================================================
// Get All Comments For Particular Blog - ends
// ============================================================



// ============================================================
// Delete All Comments By User ID - starts
// ============================================================
async function deleteAllCommentsByUserId(req,res){
    devLogger.info(`[${FILE_NAME}] Delete all comments by user ID request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        devLogger.info(`[${FILE_NAME}] Calling blog comment service to delete user comments`);
        const result = await blogCommentService.deleteAllCommentsByUserId(userID);

        devLogger.success(`[${FILE_NAME}] All comments by user deleted successfully`);
        devLogger.info(`[${FILE_NAME}] Sending delete user comments response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: SuccessMessage.USER_COMMENTS_DELETED,
            errorMessage: "",
            resultData: null
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to delete all comments by user`, error);
        devLogger.warn(`[${FILE_NAME}] Delete user comments request could not be completed`);

        return res.status(error.status || 500).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: error.message,
            resultData: null
        });
    }
};
// ============================================================
// Delete All Comments By User ID - ends
// ============================================================



// ============================================================
// Delete All Comments By Post ID - starts
// ============================================================
async function deleteAllCommentsByPostId(req,res){
    devLogger.info(`[${FILE_NAME}] Delete all comments by post ID request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Calling blog comment service to delete post comments`);
        const result = await blogCommentService.deleteAllCommentsByPostId(postID);

        devLogger.success(`[${FILE_NAME}] All comments by post deleted successfully`);
        devLogger.info(`[${FILE_NAME}] Sending delete post comments response to client`);

        return res.status(200).json({
            success: true,
            error: false,
            successMessage: SuccessMessage.POST_COMMENTS_DELETED,
            errorMessage: "",
            resultData: null
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to delete all comments by post`, error);
        devLogger.warn(`[${FILE_NAME}] Delete post comments request could not be completed`);

        return res.status(error.status || 500).json({
            success: false,
            error: true,
            successMessage: "",
            errorMessage: error.message,
            resultData: null
        });
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
