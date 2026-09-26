const blogPostRepository = require("../repositories/blog-post.repository.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-post-read.service.js";



// ============================================================
// Get All Blog Posts - starts
// ============================================================
async function getAllBlogPost() {
    devLogger.info(`[${FILE_NAME}] Get all blog posts request started`);

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog post repository to fetch all blog posts`);
        const result = await blogPostRepository.findAllBlogPosts();

        devLogger.info(`[${FILE_NAME}] Blog post repository response received`);
        devLogger.success(`[${FILE_NAME}] All blog posts fetched successfully`);

        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to get all blog posts`, error);
        throw error;
    }
}
// ============================================================
// Get All Blog Posts - ends
// ============================================================



// ============================================================
// Get Four Blog Posts - starts
// ============================================================
async function getFourBlogPost() {
    devLogger.info(`[${FILE_NAME}] Get four blog posts request started`);

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog post repository to fetch four blog posts`);
        const result = await blogPostRepository.findFourBlogPosts();

        devLogger.info(`[${FILE_NAME}] Blog post repository response received`);
        devLogger.success(`[${FILE_NAME}] Four blog posts fetched successfully`);

        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to get four blog posts`, error);
        throw error;
    }
}
// ============================================================
// Get Four Blog Posts - ends
// ============================================================



// ============================================================
// Get Particular Blog Post - starts
// ============================================================
async function getParticularBlogPost(postID) {
    devLogger.info(`[${FILE_NAME}] Get particular blog post request started`);

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog post repository to fetch blog post by ID`);
        const result = await blogPostRepository.findBlogPostById(postID);

        devLogger.info(`[${FILE_NAME}] Blog post repository response received`);
        devLogger.success(`[${FILE_NAME}] Particular blog post fetched successfully`);

        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to get particular blog post`, error);
        throw error;
    }
}
// ============================================================
// Get Particular Blog Post - ends
// ============================================================



// ============================================================
// Search Blog Post By Title - starts
// ============================================================
async function searchBlogPostByTitle(searchText) {
    devLogger.info(`[${FILE_NAME}] Search blog post by title request started`);

    try {
        devLogger.info(`[${FILE_NAME}] Calling blog post repository to search blog posts by title`);
        const result = await blogPostRepository.searchBlogPostsByTitleIgnoreCase(searchText);

        devLogger.info(`[${FILE_NAME}] Blog post search repository response received`);
        devLogger.success(`[${FILE_NAME}] Blog post title search completed successfully`);

        return result;
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to search blog post by title`, error);
        throw error;
    }
}
// ============================================================
// Search Blog Post By Title - ends
// ============================================================



// ============================================================
// Get Blog Posts With Pagination - starts
// ============================================================
async function getBlogPostWithPagination(page, limit) {
    devLogger.info(`[${FILE_NAME}] Get blog posts with pagination request started`);

    try {
        devLogger.info(`[${FILE_NAME}] Calculating pagination skip value`);
        const skip = (page - 1) * limit;

        devLogger.info(`[${FILE_NAME}] Calling blog post repository to fetch blog posts with pagination`);
        const blogPostData = await blogPostRepository.findBlogPostsWithPagination(skip, limit);
        devLogger.info(`[${FILE_NAME}] Blog post pagination repository response received`);

        devLogger.info(`[${FILE_NAME}] Calling blog post repository to count total blog posts`);
        const totalCount = await blogPostRepository.countBlogPosts();
        devLogger.info(`[${FILE_NAME}] Blog post count repository response received`);
        
        devLogger.info(`[${FILE_NAME}] Calculating total pages`);
        const totalPages = Math.ceil(totalCount / limit);

        devLogger.success(`[${FILE_NAME}] Blog posts with pagination fetched successfully`);

        return {
            currentPage: page,
            totalPages: totalPages,
            totalCount: totalCount,
            blogPostData: blogPostData
        };
    }
    catch(error) {
        devLogger.error(`[${FILE_NAME}] Failed to get blog posts with pagination`, error);
        throw error;
    }
}
// ============================================================
// Get Blog Posts With Pagination - ends
// ============================================================



// ============================================================
// Service Exports - starts
// ============================================================
module.exports = {
    getAllBlogPost,
    getFourBlogPost,
    getParticularBlogPost,
    searchBlogPostByTitle,
    getBlogPostWithPagination
};
// ============================================================
// Service Exports - ends
// ============================================================
