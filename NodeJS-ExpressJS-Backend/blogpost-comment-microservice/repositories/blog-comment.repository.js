const mongoose = require("mongoose");

const BlogPostComment = require("../database-models/blog-post-comment.model.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-comment.repository.js";



// ============================================================
// Create Comment - starts
// ============================================================
async function createComment(data) {
    logger.info(`[${FILE_NAME}] Creating new blog comment`);

    try {
        const comment = new BlogPostComment(data);
        logger.info(`[${FILE_NAME}] Saving new blog comment to database`);

        const result = await comment.save();
        logger.success(`[${FILE_NAME}] Blog comment created successfully`);
        
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to create blog comment`, error);
        logger.warn(`[${FILE_NAME}] Blog comment creation could not be completed`);
        throw error;
    }
}
// ============================================================
// Create Comment - ends
// ============================================================



// ============================================================
// Update Comment - starts
// ============================================================
async function updateComment(commentID, updatedComment) {
    logger.info(`[${FILE_NAME}] Updating blog comment`);

    try {
        logger.info(`[${FILE_NAME}] Updating comment by comment ID`);

        const result = await BlogPostComment.findByIdAndUpdate(
            commentID,
            {
                $set: {
                    commentDescription: updatedComment,
                    commentDateTime: new Date()
                }
            },
            { new: true }
        );

        logger.success(`[${FILE_NAME}] Blog comment updated successfully`);

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to update blog comment`, error);
        logger.warn(`[${FILE_NAME}] Blog comment update could not be completed`);
        throw error;
    }
}
// ============================================================
// Update Comment - ends
// ============================================================



// ============================================================
// Delete Comment - starts
// ============================================================
async function deleteComment(commentID) {
    logger.info(`[${FILE_NAME}] Deleting blog comment`);

    try {
        logger.info(`[${FILE_NAME}] Deleting comment by comment ID`);
        const result = await BlogPostComment.findByIdAndDelete(commentID);
        logger.success(`[${FILE_NAME}] Blog comment deleted successfully`);

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to delete blog comment`, error);
        logger.warn(`[${FILE_NAME}] Blog comment deletion could not be completed`);
        throw error;
    }
}
// ============================================================
// Delete Comment - ends
// ============================================================



// ============================================================
// Get Comments By Post ID - starts
// ============================================================
async function getCommentsByPostId(postID) {
    logger.info(`[${FILE_NAME}] Fetching comments for blog post`);

    try {
        logger.info(`[${FILE_NAME}] Searching comments by post ID`);

        const result = await BlogPostComment.find({
            postID: new mongoose.Types.ObjectId(postID)
        }).select("_id commentDescription commentDateTime userID postID");

        logger.success(`[${FILE_NAME}] Blog post comments fetched successfully`);

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch comments by post ID`, error);
        logger.warn(`[${FILE_NAME}] Get comments by post ID request could not be completed`);
        throw error;
    }
}
// ============================================================
// Get Comments By Post ID - ends
// ============================================================



// ============================================================
// Delete Comments By User ID - starts
// ============================================================
async function deleteCommentsByUserId(userID) {
    logger.info(`[${FILE_NAME}] Deleting all comments for user`);

    try {
        logger.info(`[${FILE_NAME}] Deleting comments by user ID`);
        const result = await BlogPostComment.deleteMany({ userID });
        logger.success(`[${FILE_NAME}] All comments for user deleted successfully`);

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to delete comments by user ID`, error);
        logger.warn(`[${FILE_NAME}] Delete user comments operation could not be completed`);
        throw error;
    }
}
// ============================================================
// Delete Comments By User ID - ends
// ============================================================



// ============================================================
// Delete Comments By Post ID - starts
// ============================================================
async function deleteCommentsByPostId(postID) {
    logger.info(`[${FILE_NAME}] Deleting all comments for blog post`);

    try {
        logger.info(`[${FILE_NAME}] Deleting comments by post ID`);
        const result = await BlogPostComment.deleteMany({ postID });
        logger.success(`[${FILE_NAME}] All comments for post deleted successfully`);

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to delete comments by post ID`, error);
        logger.warn(`[${FILE_NAME}] Delete post comments operation could not be completed`);
        throw error;
    }
}
// ============================================================
// Delete Comments By Post ID - ends
// ============================================================



// ============================================================
// Repository Exports - starts
// ============================================================
module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByPostId,
    deleteCommentsByUserId,
    deleteCommentsByPostId
};
// ============================================================
// Repository Exports - ends
// ============================================================