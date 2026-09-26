const mongoose = require("mongoose");

const BlogPostLike = require("../database-models/blog-post-like.model.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-post-like.repository.js";



// ============================================================
// Find Like - starts
// ============================================================
async function findLike(userID, postID) {
    devLogger.info(`[${FILE_NAME}] Finding blog post like`);

    try {
        devLogger.info(`[${FILE_NAME}] Searching like by user ID and post ID`);

        const result = await BlogPostLike.findOne({
            userID,
            postID
        });

        devLogger.success(`[${FILE_NAME}] Blog post like search completed successfully`);
        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to find blog post like`, error);
        devLogger.warn(`[${FILE_NAME}] Find like operation could not be completed`);
        throw error;
    }
}
// ============================================================
// Find Like - ends
// ============================================================



// ============================================================
// Create Like - starts
// ============================================================
async function createLike(userID, postID) {
    devLogger.info(`[${FILE_NAME}] Creating blog post like`);

    try {
        const like = new BlogPostLike({
            userID,
            postID
        });

        devLogger.info(`[${FILE_NAME}] Saving blog post like to database`);
        const result = await like.save();

        devLogger.success(`[${FILE_NAME}] Blog post like created successfully`);
        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to create blog post like`, error);
        devLogger.warn(`[${FILE_NAME}] Create like operation could not be completed`);
        throw error;
    }
}
// ============================================================
// Create Like - ends
// ============================================================



// ============================================================
// Delete Like - starts
// ============================================================
async function deleteLike(userID, postID) {
    devLogger.info(`[${FILE_NAME}] Deleting blog post like`);

    try {
        devLogger.info(`[${FILE_NAME}] Searching and deleting like by user ID and post ID`);

        const result = await BlogPostLike.findOneAndDelete({
            userID,
            postID
        });

        devLogger.success(`[${FILE_NAME}] Blog post like deletion operation completed successfully`);
        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete blog post like`, error);
        devLogger.warn(`[${FILE_NAME}] Delete like operation could not be completed`);
        throw error;
    }
}
// ============================================================
// Delete Like - ends
// ============================================================



// ============================================================
// Get Likes By Post ID - starts
// ============================================================
async function getLikesByPostId(postID) {
    devLogger.info(`[${FILE_NAME}] Fetching likes for blog post`);

    try {
        devLogger.info(`[${FILE_NAME}] Searching likes by post ID`);

        const result = await BlogPostLike.find({
            postID: new mongoose.Types.ObjectId(postID)
        }).select("_id userID postID");

        devLogger.success(`[${FILE_NAME}] Blog post likes fetched successfully`);
        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch likes by post ID`, error);
        devLogger.warn(`[${FILE_NAME}] Get likes by post ID operation could not be completed`);
        throw error;
    }
}
// ============================================================
// Get Likes By Post ID - ends
// ============================================================



// ============================================================
// Delete Likes By User ID - starts
// ============================================================
async function deleteLikesByUserId(userID) {
    devLogger.info(`[${FILE_NAME}] Deleting all likes for user`);

    try {
        devLogger.info(`[${FILE_NAME}] Deleting likes by user ID`);
        const result = await BlogPostLike.deleteMany({
            userID
        });

        devLogger.success(`[${FILE_NAME}] All likes for user deleted successfully`);
        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete likes by user ID`, error);
        devLogger.warn(`[${FILE_NAME}] Delete user likes operation could not be completed`);
        throw error;
    }
}
// ============================================================
// Delete Likes By User ID - ends
// ============================================================



// ============================================================
// Delete Likes By Post ID - starts
// ============================================================
async function deleteLikesByPostId(postID) {
    devLogger.info(`[${FILE_NAME}] Deleting all likes for blog post`);

    try {
        devLogger.info(`[${FILE_NAME}] Deleting likes by post ID`);
        const result = await BlogPostLike.deleteMany({
            postID
        });

        devLogger.success(`[${FILE_NAME}] All likes for post deleted successfully`);
        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete likes by post ID`, error);
        devLogger.warn(`[${FILE_NAME}] Delete post likes operation could not be completed`);
        throw error;
    }
}
// ============================================================
// Delete Likes By Post ID - ends
// ============================================================



// ============================================================
// Repository Exports - starts
// ============================================================
module.exports = {
    findLike,
    createLike,
    deleteLike,
    getLikesByPostId,
    deleteLikesByUserId,
    deleteLikesByPostId
};
// ============================================================
// Repository Exports - ends
// ============================================================
