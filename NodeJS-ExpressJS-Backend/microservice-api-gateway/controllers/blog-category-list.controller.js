const blogCategoryService = require("../services/blog-category.service.js");

const handleError = require("../utils/errorHandler.js");
const devLogger = require("../utils/dev-logger.js");


const FILE_NAME = "blog-category-list.controller.js";



// ============================================================
// Get All Blog Categories Starts
// ============================================================
async function getAllBlogCategoryList(req, res){
    devLogger.info(`[${FILE_NAME}] Get all blog category list request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Preparing to fetch all blog categories`);
        devLogger.info(`[${FILE_NAME}] Calling blog category service`);
        const blogCategoriesResponse = await blogCategoryService.getAllBlogCategoryList();
        devLogger.info(`[${FILE_NAME}] Blog category service execution completed`);
        devLogger.success(`[${FILE_NAME}] Blog category list fetched successfully`);

        devLogger.info(`[${FILE_NAME}] Sending blog category list response to client`);

        return res.status(200).json({
            success: true,
            message: blogCategoriesResponse.successMessage,
            blogCategoryList: blogCategoriesResponse.resultData,
        });

    }
    catch (error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog category list: `, error);
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
