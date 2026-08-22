const blogPostUserService = require("../services/blog-post-user.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-user.controller.js";



// ============================================================
// Get Blog Posts For Particular User With Pagination - starts
// ============================================================
const getBlogPostForParticularUserWithPagination = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Get blog posts for particular user with pagination request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        logger.info(`[${FILE_NAME}] Extracting page from request query`);
        const page = parseInt(req.query.page);

        logger.info(`[${FILE_NAME}] Extracting limit from request query`);
        const limit = parseInt(req.query.limit);

        logger.info(`[${FILE_NAME}] Calling blog post user service with pagination parameters`);
        const result =
            await blogPostUserService.getBlogPostForParticularUserWithPagination(
                userID,
                page,
                limit
            );

        logger.success(`[${FILE_NAME}] Blog posts for particular user fetched successfully`);

        logger.info(`[${FILE_NAME}] Sending particular user blog posts response to client`);
        return res.status(200).json(result);
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch blog posts for particular user`, error);
        logger.warn(`[${FILE_NAME}] Particular user blog posts request could not be completed`);
        next(error);
    }
};
// ============================================================
// Get Blog Posts For Particular User With Pagination - ends
// ============================================================



// ============================================================
// Get Blog Posted Unique User IDs - starts
// ============================================================
const getBlogPostedUniqueUserIds = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Get unique blog posted user IDs request received`);

    try {
        logger.info(`[${FILE_NAME}] Calling blog post user service to fetch unique user IDs`);
        const result = await blogPostUserService.getBlogPostedUniqueUserIds();

        logger.success(`[${FILE_NAME}] Unique blog posted user IDs fetched successfully`);

        logger.info(`[${FILE_NAME}] Sending unique user IDs response to client`);
        return res.status(200).json(result);
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch unique blog posted user IDs`, error);
        logger.warn(`[${FILE_NAME}] Unique blog posted user IDs request could not be completed`);
        next(error);
    }
};
// ============================================================
// Get Blog Posted Unique User IDs - ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Categories For Particular User - starts
// ============================================================
const getBlogPostedUniqueCategoriesForParticularUser = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Get unique blog posted categories for particular user request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        logger.info(`[${FILE_NAME}] Calling blog post user service to fetch unique categories`);
        const result =
            await blogPostUserService.getBlogPostedUniqueCategoriesForParticularUser(userID);

        logger.success(`[${FILE_NAME}] Unique categories for particular user fetched successfully`);

        logger.info(`[${FILE_NAME}] Sending unique categories response to client`);
        return res.status(200).json(result);
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch unique categories for particular user`, error);
        logger.warn(`[${FILE_NAME}] Unique categories for particular user request could not be completed`);
        next(error);
    }
};
// ============================================================
// Get Blog Posted Unique Categories For Particular User - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    getBlogPostForParticularUserWithPagination,
    getBlogPostedUniqueUserIds,
    getBlogPostedUniqueCategoriesForParticularUser
};
// ============================================================
// Controller Exports - ends
// ============================================================