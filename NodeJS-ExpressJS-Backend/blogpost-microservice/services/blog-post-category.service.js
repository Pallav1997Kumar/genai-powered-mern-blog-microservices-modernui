const blogPostRepository = require("../repositories/blog-post.repository.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-post-category.service.js";



// ============================================================
// Get Four Blog Posts For Particular Category - starts
// ============================================================
async function getFourBlogPostForParticularCategory(categoryID) {
    devLogger.info(`[${FILE_NAME}] Get four blog posts for particular category request started`);

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog post repository to fetch four blog posts by category`);
        const result = await blogPostRepository.findFourBlogPostsByCategory(categoryID);

        devLogger.info(`[${FILE_NAME}] Blog post repository response received`);
        devLogger.success(`[${FILE_NAME}] Four blog posts for particular category fetched successfully`);

        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to get four blog posts for particular category`, error);
        throw error;
    }
}
// ============================================================
// Get Four Blog Posts For Particular Category - ends
// ============================================================



// ============================================================
// Get Blog Posts For Particular Category With Pagination - starts
// ============================================================
async function getBlogPostForParticularCategoryWithPagination(categoryID, page, limit) {
    devLogger.info(`[${FILE_NAME}] Get blog posts for particular category with pagination request started`);

    try {
        devLogger.info(`[${FILE_NAME}] Calculating pagination skip value`);
        const skip = (page - 1) * limit;

        devLogger.info(`[${FILE_NAME}] Calling blog post repository to fetch category blog posts with pagination`);
        const blogPostData = await blogPostRepository.findBlogPostsByCategoryWithPagination(categoryID, skip, limit);
        devLogger.info(`[${FILE_NAME}] Blog post repository pagination response received`);

        devLogger.info(`[${FILE_NAME}] Calling blog post repository to count category blog posts`);
        const totalCount = await blogPostRepository.countBlogPostsByCategory(categoryID);
        devLogger.info(`[${FILE_NAME}] Blog post category count response received`);
        
        devLogger.info(`[${FILE_NAME}] Calculating total pages`);
        const totalPages = Math.ceil(totalCount / limit);

        devLogger.success(`[${FILE_NAME}] Blog posts for particular category with pagination fetched successfully`);

        return {
            currentPage: page,
            totalPages: totalPages,
            totalCount: totalCount,
            blogPostData: blogPostData
        };
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to get blog posts for particular category with pagination`, error);
        throw error;
    }
}
// ============================================================
// Get Blog Posts For Particular Category With Pagination - ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Category IDs - starts
// ============================================================
async function getBlogPostedUniqueCategoryIds() {
    devLogger.info(`[${FILE_NAME}] Get unique blog posted category IDs request started`);

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog post repository to fetch unique category IDs`);
        const result = await blogPostRepository.findUniqueCategoryIds();

        devLogger.info(`[${FILE_NAME}] Unique category IDs repository response received`);
        devLogger.success(`[${FILE_NAME}] Unique blog posted category IDs fetched successfully`);

        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to get unique blog posted category IDs`, error);
        throw error;
    }
}
// ============================================================
// Get Blog Posted Unique Category IDs - ends
// ============================================================



// ============================================================
// Get Blog Posted Unique Users For Particular Category - starts
// ============================================================
async function getBlogPostedUniqueUsersForParticularCategory(categoryID) {
    devLogger.info(`[${FILE_NAME}] Get unique blog posted users for particular category request started`);

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog post repository to fetch unique users by category`);
        const result = await blogPostRepository.findUniqueUsersByCategory(categoryID);

        devLogger.info(`[${FILE_NAME}] Unique users repository response received`);
        devLogger.success(`[${FILE_NAME}] Unique blog posted users for particular category fetched successfully`);

        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to get unique blog posted users for particular category`, error);
        throw error;
    }
}
// ============================================================
// Get Blog Posted Unique Users For Particular Category - ends
// ============================================================



// ============================================================
// Service Exports - starts
// ============================================================
module.exports = {
    getFourBlogPostForParticularCategory,
    getBlogPostForParticularCategoryWithPagination,
    getBlogPostedUniqueCategoryIds,
    getBlogPostedUniqueUsersForParticularCategory
};
// ============================================================
// Service Exports - ends
// ============================================================
