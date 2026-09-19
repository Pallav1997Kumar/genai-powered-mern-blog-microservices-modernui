const dotenv = require("dotenv");

const blogCategoryService = require("../services/blog-category.service.js");

const handleError = require("../utils/errorHandler.js");
const logger = require("../utils/logger.js");


const FILE_NAME = "blog-category-list.controller.js";



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
// Get All Blog Categories Starts
// ============================================================
async function getAllBlogCategoryList(req, res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get all blog category list request received`);
    }

    try {
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Preparing to fetch all blog categories`);

            logger.info(`[${FILE_NAME}] Calling blog category service`);
        }
        const result = await blogCategoryService.getAllBlogCategoryList();

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Blog category service execution completed`);

            logger.success(`[${FILE_NAME}] Blog category list fetched successfully`);
            logger.info(`[${FILE_NAME}] Preparing blog category list response`);

            logger.info(`[${FILE_NAME}] Sending blog category list response to client`);
        }
        res.status(200).json(result);
    }
    catch (error) {
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch blog category list: `, error);
        }
        return handleError(res, error);
    }
};
// ============================================================
// Get All Blog Categories Ends
// ============================================================



// ============================================================
// Controller Exports Starts
// ============================================================
module.exports = {
    getAllBlogCategoryList
};
// ============================================================
// Controller Exports Ends
// ============================================================
