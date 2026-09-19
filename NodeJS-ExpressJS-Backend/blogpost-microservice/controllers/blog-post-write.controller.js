const dotenv = require("dotenv");

const blogPostWriteService = require("../services/blog-post-write.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-write.controller.js";



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
// Add New Blog Post - starts
// ============================================================
async function addNewBlogPost(req, res, next) {
    if(process.env.environment === "development"){
        logger.info(`[${FILE_NAME}] Add new blog post request received`);
    }

    try {
        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting blog post title from request body`);
        }
        const title = req.body.title;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting blog post description from request body`);
        }
        const postDescription = req.body.postDescription;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting blog post category from request body`);
        }
        const category = req.body.category;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting blog post image details from request body`);
        }
        const imageDetail = req.body.imageDetail;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting authentication token from request body or cookies`);
        }
        const token = req.body.token || req.cookies.jwt_access_token;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Preparing new blog post object`);
        }
        const newBlogPostObject = {
            title,
            postDescription,
            category,
            imageDetail
        };

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Calling blog post write service to add new blog post`);
        }
        const result = await blogPostWriteService.addNewBlogPost(
            token,
            newBlogPostObject
        );

        if(process.env.environment === "development"){
            logger.success(`[${FILE_NAME}] New blog post added successfully`);
        }

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Sending new blog post response to client`);
        }
        return res.status(200).json({
            success: true,
            message: "Blog Post has been added successfully",
            data: result
        });
    }
    catch(error) {
        if(process.env.environment === "development"){
            logger.error(`[${FILE_NAME}] Failed to add new blog post`, error);
        }

        if(process.env.environment === "development"){
            logger.warn(`[${FILE_NAME}] Add new blog post request could not be completed`);
        }

        next(error);
    }
}
// ============================================================
// Add New Blog Post - ends
// ============================================================



// ============================================================
// Delete Blog Post By Post ID - starts
// ============================================================
async function deleteBlogPostByPostId(req, res, next) {
    if(process.env.environment === "development"){
        logger.info(`[${FILE_NAME}] Delete blog post by post ID request received`);
    }

    try {
        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting authentication token from request body or cookies`);
        }
        const authorization = req.headers.authorization;
        const token = authorization?.startsWith("Bearer ")
            ? authorization.split(" ")[1]
            : null;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        }
        const postID = req.params.postID;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Calling blog post write service to delete blog post`);
        }
        await blogPostWriteService.deleteBlogPostByPostId(token, postID);

        if(process.env.environment === "development"){
            logger.success(`[${FILE_NAME}] Blog post deleted successfully`);
        }

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Sending delete blog post response to client`);
        }
        return res.status(200).json({
            success: true,
            message: "Post has been deleted successfully"
        });
    }
    catch(error) {
        if(process.env.environment === "development"){
            logger.error(`[${FILE_NAME}] Failed to delete blog post by post ID`, error);
        }

        if(process.env.environment === "development"){
            logger.warn(`[${FILE_NAME}] Delete blog post request could not be completed`);
        }

        next(error);
    }
}
// ============================================================
// Delete Blog Post By Post ID - ends
// ============================================================



// ============================================================
// Update Blog Post By Post ID - starts
// ============================================================
async function updateBlogPostByPostId(req, res, next) {
    if(process.env.environment === "development"){
        logger.info(`[${FILE_NAME}] Update blog post by post ID request received`);
    }

    try {
        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting authentication token from request body or cookies`);
        }
        const token = req.body.token || req.cookies.jwt_access_token;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting blog post title from request body`);
        }
        const title = req.body.title;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting blog post description from request body`);
        }
        const postDescription = req.body.postDescription;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting blog post category from request body`);
        }
        const category = req.body.category;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting blog post image details from request body`);
        }
        const imageDetail = req.body.imageDetail;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        }
        const postID = req.params.postID;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Preparing updated blog post object`);
        }
        const updatedBlogPostObject = {
            title,
            postDescription,
            category,
            imageDetail
        };

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Calling blog post write service to update blog post`);
        }
        const result = await blogPostWriteService.updateBlogPostByPostId(
            token,
            postID,
            updatedBlogPostObject
        );

        if(process.env.environment === "development"){
            logger.success(`[${FILE_NAME}] Blog post updated successfully`);
        }

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Sending updated blog post response to client`);
        }
        return res.status(200).json({
            success: true,
            message: "Post has been successfully updated",
            data: result
        });
    }
    catch(error) {
        if(process.env.environment === "development"){
            logger.error(`[${FILE_NAME}] Failed to update blog post by post ID`, error);
        }

        if(process.env.environment === "development"){
            logger.warn(`[${FILE_NAME}] Update blog post request could not be completed`);
        }

        next(error);
    }
}
// ============================================================
// Update Blog Post By Post ID - ends
// ============================================================



// ============================================================
// Delete Blog Posts By User ID - starts
// ============================================================
async function deleteBlogPostByUserId(req, res, next) {
    if(process.env.environment === "development"){
        logger.info(`[${FILE_NAME}] Delete blog posts by user ID request received`);
    }

    try {
        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting authentication token from request body or cookies`);
        }
        const authorization = req.headers.authorization;
        const token = authorization?.startsWith("Bearer ")
            ? authorization.split(" ")[1]
            : null;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        }
        const userID = req.params.userID;

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Calling blog post write service to delete user blog posts`);
        }
        await blogPostWriteService.deleteBlogPostByUserId(token, userID);

        if(process.env.environment === "development"){
            logger.success(`[${FILE_NAME}] Blog posts deleted by user ID successfully`);
        }

        if(process.env.environment === "development"){
            logger.info(`[${FILE_NAME}] Sending delete user blog posts response to client`);
        }
        return res.status(200).json({
            success: true,
            message: "Blog posts deleted successfully"
        });
    }
    catch(error) {
        if(process.env.environment === "development"){
            logger.error(`[${FILE_NAME}] Failed to delete blog posts by user ID`, error);
        }

        if(process.env.environment === "development"){
            logger.warn(`[${FILE_NAME}] Delete user blog posts request could not be completed`);
        }

        next(error);
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
