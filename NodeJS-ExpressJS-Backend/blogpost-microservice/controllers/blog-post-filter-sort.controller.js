const ErrorMessage = require("../constants/error-message.constant.js");
const SuccessMessage = require("../constants/success-message.constant.js");
const blogPostFilterSortService = require("../services/blog-post-filter-sort.service.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-post-filter-sort.controller.js";



// ============================================================
// Get Blog Post Details With Filter Sort With Pagination - starts
// ============================================================
async function getBlogPostDetailsWithFilterSortWithPagination(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get blog post details with filter sort and pagination request received`);
    
    try {
        devLogger.info(`[${FILE_NAME}] Preparing query and body data for filter sort request`);
        
        const result =
            await blogPostFilterSortService.getBlogPostDetailsWithFilterSortWithPagination({
                query: req.query,
                body: req.body
            });

        devLogger.success(`[${FILE_NAME}] Blog post details with filter sort and pagination fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending filtered and sorted blog posts response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_POST_FILTER_SORT_PAGINATION_COMPLETED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog post details with filter sort and pagination`, error);
        devLogger.warn(`[${FILE_NAME}] Filter sort and pagination request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_FILTER_SORT_PAGINATION,
            resultData:null
        });
    }
};
// ============================================================
// Get Blog Post Details With Filter Sort With Pagination - ends
// ============================================================



// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular User - starts
// ============================================================
async function getBlogPostDetailsWithFilterSortWithPaginationForParticularUser(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get filtered and sorted blog posts for particular user request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        const userID = req.params.userID;

        devLogger.info(`[${FILE_NAME}] Preparing query and body data for particular user filter sort request`);

        const result =
            await blogPostFilterSortService.getBlogPostDetailsWithFilterSortWithPaginationForParticularUser({
                query: req.query,
                body: req.body,
                userID: userID
            });

        devLogger.success(`[${FILE_NAME}] Filtered and sorted blog posts for particular user fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending particular user filtered blog posts response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.USER_BLOG_POST_FILTER_SORT_PAGINATION_COMPLETED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch filtered and sorted blog posts for particular user`, error);
        devLogger.warn(`[${FILE_NAME}] Particular user filter sort request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_USER_FILTER_SORT_PAGINATION,
            resultData:null
        });
    }
};
// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular User - ends
// ============================================================



// ============================================================
// Get Blog Post Details With Filter Sort With Pagination For Particular Category - starts
// ============================================================
async function getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory(req, res, next) {
    devLogger.info(`[${FILE_NAME}] Get filtered and sorted blog posts for particular category request received`);

    try {
        devLogger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);
        const categoryID = req.params.categoryID;

        devLogger.info(`[${FILE_NAME}] Preparing query and body data for particular category filter sort request`);

        const result =
            await blogPostFilterSortService.getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory({
                query: req.query,
                body: req.body,
                categoryID: categoryID
            });

        devLogger.success(`[${FILE_NAME}] Filtered and sorted blog posts for particular category fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending particular category filtered blog posts response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.CATEGORY_BLOG_POST_FILTER_SORT_PAGINATION_COMPLETED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to fetch filtered and sorted blog posts for particular category`, error);
        devLogger.warn(`[${FILE_NAME}] Particular category filter sort request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_CATEGORY_FILTER_SORT_PAGINATION,
            resultData:null
        });
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
