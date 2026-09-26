const ErrorMessage = require("../constants/error-message.constant.js");
const SuccessMessage = require("../constants/success-message.constant.js");
const blogPostWriteService = require("../services/blog-post-write.service.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-post-write.controller.js";



// ============================================================
// Add New Blog Post - starts
// ============================================================
async function addNewBlogPost(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Add new blog post request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting blog post title from request body`);
        const title = req.body.title;

        devLogger.info(`[${FILE_NAME}] Extracting blog post description from request body`);
        const postDescription = req.body.postDescription;

        devLogger.info(`[${FILE_NAME}] Extracting blog post category from request body`);
        const category = req.body.category;

        devLogger.info(`[${FILE_NAME}] Extracting blog post image details from request body`);
        const imageDetail = req.body.imageDetail;

        devLogger.info(`[${FILE_NAME}] Extracting authentication token from request body or cookies`);
        const token = req.body.token || req.cookies.jwt_access_token;

        devLogger.info(`[${FILE_NAME}] Preparing new blog post object`);

        const newBlogPostObject = {
            title,
            postDescription,
            category,
            imageDetail
        };

        devLogger.info(`[${FILE_NAME}] Calling blog post write service to add new blog post`);
        const result = await blogPostWriteService.addNewBlogPost(token, newBlogPostObject);
        devLogger.success(`[${FILE_NAME}] New blog post added successfully`);

        devLogger.info(`[${FILE_NAME}] Sending new blog post response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_POST_ADDED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to add new blog post`, error);
        devLogger.warn(`[${FILE_NAME}] Add new blog post request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_ADD_BLOG_POST,
            resultData:null
        });
    }
}
// ============================================================
// Add New Blog Post - ends
// ============================================================



// ============================================================
// Delete Blog Post By Post ID - starts
// ============================================================
async function deleteBlogPostByPostId(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Delete blog post by post ID request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting authentication token from request body or cookies`);
        const authorization = req.headers.authorization;
        const token = authorization?.startsWith("Bearer ")
            ? authorization.split(" ")[1]
            : null;

        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Calling blog post write service to delete blog post`);
        await blogPostWriteService.deleteBlogPostByPostId(token, postID);
        devLogger.success(`[${FILE_NAME}] Blog post deleted successfully`);

        devLogger.info(`[${FILE_NAME}] Sending delete blog post response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_POST_DELETED,
            errorMessage:"",
            resultData:null
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete blog post by post ID`, error);
        devLogger.warn(`[${FILE_NAME}] Delete blog post request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_DELETE_BLOG_POST,
            resultData:null
        });
    }
}
// ============================================================
// Delete Blog Post By Post ID - ends
// ============================================================



// ============================================================
// Update Blog Post By Post ID - starts
// ============================================================
async function updateBlogPostByPostId(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Update blog post by post ID request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting authentication token from request body or cookies`);
        const token = req.body.token || req.cookies.jwt_access_token;

        devLogger.info(`[${FILE_NAME}] Extracting blog post title from request body`);
        const title = req.body.title;

        devLogger.info(`[${FILE_NAME}] Extracting blog post description from request body`);
        const postDescription = req.body.postDescription;

        devLogger.info(`[${FILE_NAME}] Extracting blog post category from request body`);
        const category = req.body.category;

        devLogger.info(`[${FILE_NAME}] Extracting blog post image details from request body`);
        const imageDetail = req.body.imageDetail;

        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        devLogger.info(`[${FILE_NAME}] Preparing updated blog post object`);

        const updatedBlogPostObject = {
            title,
            postDescription,
            category,
            imageDetail
        };

        devLogger.info(`[${FILE_NAME}] Calling blog post write service to update blog post`);
        const result = await blogPostWriteService.updateBlogPostByPostId(token, postID, updatedBlogPostObject);
        devLogger.success(`[${FILE_NAME}] Blog post updated successfully`);

        devLogger.info(`[${FILE_NAME}] Sending updated blog post response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_POST_UPDATED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to update blog post by post ID`, error);
        devLogger.warn(`[${FILE_NAME}] Update blog post request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_UPDATE_BLOG_POST,
            resultData:null
        });
    }
}
// ============================================================
// Update Blog Post By Post ID - ends
// ============================================================



// ============================================================
// Delete Blog Posts By User ID - starts
// ============================================================
async function deleteBlogPostByUserId(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Delete blog posts by user ID request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting authentication token from request body or cookies`);
        const authorization = req.headers.authorization;
        const token = authorization?.startsWith("Bearer ")
            ? authorization.split(" ")[1]
            : null;

        devLogger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        devLogger.info(`[${FILE_NAME}] Calling blog post write service to delete user blog posts`);
        await blogPostWriteService.deleteBlogPostByUserId(token, userID);

        devLogger.success(`[${FILE_NAME}] Blog posts deleted by user ID successfully`);
        devLogger.info(`[${FILE_NAME}] Sending delete user blog posts response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.USER_BLOG_POSTS_DELETED,
            errorMessage:"",
            resultData:null
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to delete blog posts by user ID`, error);
        devLogger.warn(`[${FILE_NAME}] Delete user blog posts request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_DELETE_USER_BLOG_POSTS,
            resultData:null
        });
    }
}
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