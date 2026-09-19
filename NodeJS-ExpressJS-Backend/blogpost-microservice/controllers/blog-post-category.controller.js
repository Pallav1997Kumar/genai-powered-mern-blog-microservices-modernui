const dotenv = require("dotenv");

const blogPostCategoryService = require("../services/blog-post-category.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-category.controller.js";



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
// Get Four Blog Posts For Particular Category - starts
// ============================================================
async function getFourBlogPostForParticularCategory(req, res, next) {

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get four blog posts for particular category request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);
        }
        const categoryID = req.params.categoryID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post category service to fetch four blog posts`);
        }
        const result = await blogPostCategoryService.getFourBlogPostForParticularCategory(categoryID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Four blog posts for particular category fetched successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending four blog posts response to client`);
        }
        return res.status(200).json(result);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch four blog posts for particular category`, error);
            logger.warn(`[${FILE_NAME}] Four blog posts for particular category request could not be completed`);
        }
        next(error);
    }
};
// ============================================================
// Get Four Blog Posts For Particular Category - ends
// ============================================================



// ============================================================
// Get Blog Posts For Particular Category With Pagination - starts
// ============================================================
async function getBlogPostForParticularCategoryWithPagination(req, res, next) {

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get blog posts for particular category with pagination request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);
        }
        const categoryID = req.params.categoryID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting page from request query`);
        }
        const page = parseInt(req.query.page);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting limit from request query`);
        }
        const limit = parseInt(req.query.limit);

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post category service with pagination parameters`);
        }
        const result = 
            await blogPostCategoryService.getBlogPostForParticularCategoryWithPagination(
                categoryID, 
                page, 
                limit
            );

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Blog posts for particular category with pagination fetched successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending paginated category blog posts response to client`);
        }
        return res.status(200).json(result);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch blog posts for particular category with pagination`, error);
            logger.warn(`[${FILE_NAME}] Paginated category blog posts request could not be completed`);
        }
        next(error);
    }
};
// ============================================================
// Get Blog Posts For Particular Category With Pagination - ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Category IDs - starts
// ============================================================
async function getBlogPostedUniqueCategoryIds(req, res, next) {

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get unique blog posted category IDs request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post category service to fetch unique category IDs`);
        }
        const result = await blogPostCategoryService.getBlogPostedUniqueCategoryIds();

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Unique blog posted category IDs fetched successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending unique category IDs response to client`);
        }
        return res.status(200).json(result);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch unique blog posted category IDs`, error);
            logger.warn(`[${FILE_NAME}] Unique category IDs request could not be completed`);
        }
        next(error);
    }
};
// ============================================================
// Get Blog Posted Unique Category IDs - ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Users For Particular Category - starts
// ============================================================
async function getBlogPostedUniqueUsersForParticularCategory(req, res, next) {

    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get unique blog posted users for particular category request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);
        }
        const categoryID = req.params.categoryID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post category service to fetch unique users`);
        }
        const result = await blogPostCategoryService.getBlogPostedUniqueUsersForParticularCategory(categoryID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Unique blog posted users for particular category fetched successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending unique users response to client`);
        }
        return res.status(200).json(result);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch unique blog posted users for particular category`, error);
            logger.warn(`[${FILE_NAME}] Unique users for particular category request could not be completed`);
        }
        next(error);
    }
};
// ============================================================
// Get Blog Posted Unique Users For Particular Category - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    getFourBlogPostForParticularCategory,
    getBlogPostForParticularCategoryWithPagination,
    getBlogPostedUniqueCategoryIds,
    getBlogPostedUniqueUsersForParticularCategory
};
// ============================================================
// Controller Exports - ends
// ============================================================