const blogCategoryService = require("../services/blog-category.service.js");

const handleError = require("../utils/errorHandler.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-category-list.controller.js";


// ============================================================
// Get All Blog Categories Starts
// ============================================================
async function getAllBlogCategoryList(req, res){
    logger.info(`[${FILE_NAME}] Get all blog category list request received`);

    try {
        logger.info(`[${FILE_NAME}] Preparing to fetch all blog categories`);

        logger.info(`[${FILE_NAME}] Calling blog category service`);
        const result = await blogCategoryService.getAllBlogCategoryList();
        logger.info(`[${FILE_NAME}] Blog category service execution completed`);

        logger.success(`[${FILE_NAME}] Blog category list fetched successfully`);
        logger.info(`[${FILE_NAME}] Preparing blog category list response`);

        logger.info(`[${FILE_NAME}] Sending blog category list response to client`);
        res.status(200).json(result);
    }
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to fetch blog category list: `, error);
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