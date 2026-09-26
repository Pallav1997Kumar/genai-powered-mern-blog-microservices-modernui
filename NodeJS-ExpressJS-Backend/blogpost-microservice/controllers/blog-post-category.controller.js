const ErrorMessage = require("../constants/error-message.constant.js");
const SuccessMessage = require("../constants/success-message.constant.js");
const blogPostCategoryService = require("../services/blog-post-category.service.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-post-category.controller.js";



// ============================================================
// Get Four Blog Posts For Particular Category - starts
// ============================================================
async function getFourBlogPostForParticularCategory(req,res,next){
    devLogger.info(`[${FILE_NAME}] Get four blog posts for particular category request received`);
    
    try{
        devLogger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);
        const categoryID = req.params.categoryID;

        devLogger.info(`[${FILE_NAME}] Calling blog post category service to fetch four blog posts`);
        const result = await blogPostCategoryService.getFourBlogPostForParticularCategory(categoryID);
        
        devLogger.success(`[${FILE_NAME}] Four blog posts for particular category fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending four blog posts response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.FOUR_CATEGORY_BLOG_POSTS_FETCHED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to fetch four blog posts for particular category`, error);
        devLogger.warn(`[${FILE_NAME}] Four blog posts for particular category request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_FOUR_CATEGORY_POSTS,
            resultData:null
        });
    }
};
// ============================================================
// Get Four Blog Posts For Particular Category - ends
// ============================================================



// ============================================================
// Get Blog Posts For Particular Category With Pagination - starts
// ============================================================
async function getBlogPostForParticularCategoryWithPagination(req,res,next){
    devLogger.info(`[${FILE_NAME}] Get blog posts for particular category with pagination request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);
        const categoryID = req.params.categoryID;

        devLogger.info(`[${FILE_NAME}] Extracting page from request query`);
        const page = parseInt(req.query.page);

        devLogger.info(`[${FILE_NAME}] Extracting limit from request query`);
        const limit = parseInt(req.query.limit);

        devLogger.info(`[${FILE_NAME}] Calling blog post category service with pagination parameters`);
        const result = await blogPostCategoryService.getBlogPostForParticularCategoryWithPagination(categoryID, page, limit);
        
        devLogger.success(`[${FILE_NAME}] Blog posts for particular category with pagination fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending paginated category blog posts response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.CATEGORY_BLOG_POSTS_PAGINATED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posts for particular category with pagination`, error);
        devLogger.warn(`[${FILE_NAME}] Paginated category blog posts request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_CATEGORY_POSTS_PAGINATION,
            resultData:null
        });
    }
};
// ============================================================
// Get Blog Posts For Particular Category With Pagination - ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Category IDs - starts
// ============================================================
async function getBlogPostedUniqueCategoryIds(req,res,next){
    devLogger.info(`[${FILE_NAME}] Get unique blog posted category IDs request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Calling blog post category service to fetch unique category IDs`);
        const result = await blogPostCategoryService.getBlogPostedUniqueCategoryIds();
        
        devLogger.success(`[${FILE_NAME}] Unique blog posted category IDs fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending unique category IDs response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.UNIQUE_CATEGORY_IDS_FETCHED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to fetch unique blog posted category IDs`, error);
        devLogger.warn(`[${FILE_NAME}] Unique category IDs request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_UNIQUE_CATEGORY_IDS,
            resultData:null
        });
    }
};
// ============================================================
// Get Blog Posted Unique Category IDs - ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Users For Particular Category - starts
// ============================================================
async function getBlogPostedUniqueUsersForParticularCategory(req,res,next){
    devLogger.info(`[${FILE_NAME}] Get unique blog posted users for particular category request received`);

    try{
        devLogger.info(`[${FILE_NAME}] Extracting category ID from request parameters`);
        const categoryID = req.params.categoryID;

        devLogger.info(`[${FILE_NAME}] Calling blog post category service to fetch unique users`);
        const result = await blogPostCategoryService.getBlogPostedUniqueUsersForParticularCategory(categoryID);

        devLogger.success(`[${FILE_NAME}] Unique blog posted users for particular category fetched successfully`);
        devLogger.info(`[${FILE_NAME}] Sending unique users response to client`);

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.UNIQUE_CATEGORY_USERS_FETCHED,
            errorMessage:"",
            resultData:result
        });
    }
    catch(error){
        devLogger.error(`[${FILE_NAME}] Failed to fetch unique blog posted users for particular category`, error);
        devLogger.warn(`[${FILE_NAME}] Unique users for particular category request could not be completed`);

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_UNIQUE_CATEGORY_USERS,
            resultData:null
        });
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