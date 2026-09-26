const ErrorMessage = require("../constants/error-message.constant.js");
const SuccessMessage = require("../constants/success-message.constant.js");
const blogPostUserService = require("../services/blog-post-user.service.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-post-user.controller.js";



// ============================================================
// Get All Blog Post IDs By User ID - starts
// ============================================================
async function getAllBlogPostIdsByUserId(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get all blog post IDs by user ID request received`);
    try {
        devLogger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        devLogger.info(`[${FILE_NAME}] Calling blog post user service to fetch all blog post IDs`);
        const result = await blogPostUserService.getAllBlogPostIdsByUserId(userID);

        devLogger.success(`[${FILE_NAME}] All blog post IDs for user fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending all blog post IDs response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.USER_BLOG_POST_IDS_FETCHED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch all blog post IDs for user`, error);
        devLogger.warn(`[${FILE_NAME}] Get all blog post IDs by user ID request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_USER_BLOG_POST_IDS,
            resultData:null
        });
    }
};
// ============================================================
// Get All Blog Post IDs By User ID - ends
// ============================================================



// ============================================================
// Get Blog Posts For Particular User With Pagination - starts
// ============================================================
async function getBlogPostForParticularUserWithPagination(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get blog posts for particular user with pagination request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        devLogger.info(`[${FILE_NAME}] Extracting page from request query`);
        const page = parseInt(req.query.page);

        devLogger.info(`[${FILE_NAME}] Extracting limit from request query`);
        const limit = parseInt(req.query.limit);

        devLogger.info(`[${FILE_NAME}] Calling blog post user service with pagination parameters`);
        const result = await blogPostUserService.getBlogPostForParticularUserWithPagination(userID, page, limit);

        devLogger.success(`[${FILE_NAME}] Blog posts for particular user fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending particular user blog posts response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.USER_BLOG_POSTS_FETCHED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posts for particular user`, error);
        devLogger.warn(`[${FILE_NAME}] Particular user blog posts request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_USER_BLOG_POSTS,
            resultData:null
        });
    }
};
// ============================================================
// Get Blog Posts For Particular User With Pagination - ends
// ============================================================



// ============================================================
// Get Blog Posted Unique User IDs - starts
// ============================================================
async function getBlogPostedUniqueUserIds(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get unique blog posted user IDs request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog post user service to fetch unique user IDs`);
        const result = await blogPostUserService.getBlogPostedUniqueUserIds();

        devLogger.success(`[${FILE_NAME}] Unique blog posted user IDs fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending unique user IDs response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.UNIQUE_BLOG_USER_IDS_FETCHED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch unique blog posted user IDs`, error);
        devLogger.warn(`[${FILE_NAME}] Unique blog posted user IDs request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_UNIQUE_BLOG_USER_IDS,
            resultData:null
        });
    }
};
// ============================================================
// Get Blog Posted Unique User IDs - ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Categories For Particular User - starts
// ============================================================
async function getBlogPostedUniqueCategoriesForParticularUser(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get unique blog posted categories for particular user request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        devLogger.info(`[${FILE_NAME}] Calling blog post user service to fetch unique categories`);
        const result = await blogPostUserService.getBlogPostedUniqueCategoriesForParticularUser(userID);

        devLogger.success(`[${FILE_NAME}] Unique categories for particular user fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending unique categories response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.USER_CATEGORIES_FETCHED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch unique categories for particular user`, error);
        devLogger.warn(`[${FILE_NAME}] Unique categories for particular user request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_USER_CATEGORIES,
            resultData:null
        });
    }
};
// ============================================================
// Get Blog Posted Unique Categories For Particular User - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    getAllBlogPostIdsByUserId,
    getBlogPostForParticularUserWithPagination,
    getBlogPostedUniqueUserIds,
    getBlogPostedUniqueCategoriesForParticularUser
};
// ============================================================
// Controller Exports - ends
// ============================================================