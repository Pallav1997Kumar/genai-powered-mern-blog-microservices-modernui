const blogPostWriteService = require("../services/blog-post-write.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-write.controller.js";



// ============================================================
// Add New Blog Post - starts
// ============================================================
const addNewBlogPost = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Add new blog post request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting blog post title from request body`);
        const title = req.body.title;

        logger.info(`[${FILE_NAME}] Extracting blog post description from request body`);
        const postDescription = req.body.postDescription;

        logger.info(`[${FILE_NAME}] Extracting blog post category from request body`);
        const category = req.body.category;

        logger.info(`[${FILE_NAME}] Extracting blog post image details from request body`);
        const imageDetail = req.body.imageDetail;

        logger.info(`[${FILE_NAME}] Extracting authentication token from request body or cookies`);
        const token = req.body.token || req.cookies.jwt_access_token;

        logger.info(`[${FILE_NAME}] Preparing new blog post object`);
        const newBlogPostObject = {
            title,
            postDescription,
            category,
            imageDetail
        };

        logger.info(`[${FILE_NAME}] Calling blog post write service to add new blog post`);
        const result = await blogPostWriteService.addNewBlogPost(
            token,
            newBlogPostObject
        );

        logger.success(`[${FILE_NAME}] New blog post added successfully`);

        logger.info(`[${FILE_NAME}] Sending new blog post response to client`);
        return res.status(200).json({
            success: true,
            message: "Blog Post has been added successfully",
            data: result
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to add new blog post`, error);
        logger.warn(`[${FILE_NAME}] Add new blog post request could not be completed`);
        next(error);
    }
};
// ============================================================
// Add New Blog Post - ends
// ============================================================



// ============================================================
// Delete Blog Post By Post ID - starts
// ============================================================
const deleteBlogPostByPostId = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Delete blog post by post ID request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting authentication token from request body or cookies`);
        const token = req.body.token || req.cookies.jwt_access_token;

        logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        logger.info(`[${FILE_NAME}] Calling blog post write service to delete blog post`);
        await blogPostWriteService.deleteBlogPostByPostId(token, postID);

        logger.success(`[${FILE_NAME}] Blog post deleted successfully`);

        logger.info(`[${FILE_NAME}] Sending delete blog post response to client`);
        return res.status(200).json({
            success: true,
            message: "Post has been deleted successfully"
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to delete blog post by post ID`, error);
        logger.warn(`[${FILE_NAME}] Delete blog post request could not be completed`);
        next(error);
    }
};
// ============================================================
// Delete Blog Post By Post ID - ends
// ============================================================



// ============================================================
// Update Blog Post By Post ID - starts
// ============================================================
const updateBlogPostByPostId = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Update blog post by post ID request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting authentication token from request body or cookies`);
        const token = req.body.token || req.cookies.jwt_access_token;

        logger.info(`[${FILE_NAME}] Extracting blog post title from request body`);
        const title = req.body.title;

        logger.info(`[${FILE_NAME}] Extracting blog post description from request body`);
        const postDescription = req.body.postDescription;

        logger.info(`[${FILE_NAME}] Extracting blog post category from request body`);
        const category = req.body.category;

        logger.info(`[${FILE_NAME}] Extracting blog post image details from request body`);
        const imageDetail = req.body.imageDetail;

        logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        logger.info(`[${FILE_NAME}] Preparing updated blog post object`);
        const updatedBlogPostObject = {
            title,
            postDescription,
            category,
            imageDetail
        };

        logger.info(`[${FILE_NAME}] Calling blog post write service to update blog post`);
        const result = await blogPostWriteService.updateBlogPostByPostId(
            token,
            postID,
            updatedBlogPostObject
        );

        logger.success(`[${FILE_NAME}] Blog post updated successfully`);

        logger.info(`[${FILE_NAME}] Sending updated blog post response to client`);
        return res.status(200).json({
            success: true,
            message: "Post has been successfully updated",
            data: result
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to update blog post by post ID`, error);
        logger.warn(`[${FILE_NAME}] Update blog post request could not be completed`);
        next(error);
    }
};
// ============================================================
// Update Blog Post By Post ID - ends
// ============================================================



// ============================================================
// Delete Blog Posts By User ID - starts
// ============================================================
const deleteBlogPostByUserId = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Delete blog posts by user ID request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting authentication token from request body or cookies`);
        const token = req.body.token || req.cookies.jwt_access_token;

        logger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        logger.info(`[${FILE_NAME}] Calling blog post write service to delete user blog posts`);
        await blogPostWriteService.deleteBlogPostByUserId(token, userID);

        logger.success(`[${FILE_NAME}] Blog posts deleted by user ID successfully`);

        logger.info(`[${FILE_NAME}] Sending delete user blog posts response to client`);
        return res.status(200).json({
            success: true,
            message: "Blog posts deleted successfully"
        });
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to delete blog posts by user ID`, error);
        logger.warn(`[${FILE_NAME}] Delete user blog posts request could not be completed`);
        next(error);
    }
};
// ============================================================
// Delete Blog Posts By User ID - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    addNewBlogPost,
    deleteBlogPostByPostId,
    updateBlogPostByPostId,
    deleteBlogPostByUserId
};
// ============================================================
// Controller Exports - ends
// ============================================================