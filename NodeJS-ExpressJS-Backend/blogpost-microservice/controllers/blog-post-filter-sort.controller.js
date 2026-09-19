const dotenv = require("dotenv");

const blogPostFilterSortService = require("../services/blog-post-filter-sort.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-filter-sort.controller.js";



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
// Get Blog Post Details With Filter Sort With Pagination - starts
// ============================================================
async function getBlogPostDetailsWithFilterSortWithPagination(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get blog post details with filter sort and pagination request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Preparing query and body data for filter sort request`);
        }

        const result =
            await blogPostFilterSortService.getBlogPostDetailsWithFilterSortWithPagination({
                query: req.query,
                body: req.body
            });

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Blog post details with filter sort and pagination fetched successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending filtered and sorted blog posts response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch blog post details with filter sort and pagination`, error);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Filter sort and pagination request could not be completed`);
        }

        next(error);
    }
};
// ============================================================
// Get Blog Post Details With Filter Sort With Pagination - ends
// ============================================================



// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular User - starts
// ============================================================
async function getBlogPostDetailsWithFilterSortWithPaginationForParticularUser(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get filtered and sorted blog posts for particular user request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        }

        const userID = req.params.userID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Preparing query and body data for particular user filter sort request`);
        }

        const result =
            await blogPostFilterSortService.getBlogPostDetailsWithFilterSortWithPaginationForParticularUser({
                query: req.query,
                body: req.body,
                userID: userID
            });

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Filtered and sorted blog posts for particular user fetched successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending particular user filtered blog posts response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch filtered and sorted blog posts for particular user`, error);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Particular user filter sort request could not be completed`);
        }

        next(error);
    }
};
// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular User - ends
// ============================================================



// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular Category - starts
// ============================================================
async function getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory(req, res, next) {
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get filtered and sorted blog posts for particular category request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);
        }

        const categoryID = req.params.categoryID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Preparing query and body data for particular category filter sort request`);
        }

        const result =
            await blogPostFilterSortService.getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory({
                query: req.query,
                body: req.body,
                categoryID: categoryID
            });

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Filtered and sorted blog posts for particular category fetched successfully`);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending particular category filtered blog posts response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch filtered and sorted blog posts for particular category`, error);
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Particular category filter sort request could not be completed`);
        }

        next(error);
    }
};
// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular Category - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    getBlogPostDetailsWithFilterSortWithPagination,
    getBlogPostDetailsWithFilterSortWithPaginationForParticularUser,
    getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory
};
// ============================================================
// Controller Exports - ends
// ============================================================
