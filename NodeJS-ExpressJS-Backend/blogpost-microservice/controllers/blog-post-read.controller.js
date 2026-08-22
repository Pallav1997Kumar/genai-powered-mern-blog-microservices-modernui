const blogPostReadService = require("../services/blog-post-read.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-read.controller.js";



// ============================================================
// Get All Blog Posts - starts
// ============================================================
const getAllBlogPosts = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Get all blog posts request received`);

    try {
        logger.info(`[${FILE_NAME}] Calling blog post read service to fetch all blog posts`);
        const result = await blogPostReadService.getAllBlogPost();

        logger.success(`[${FILE_NAME}] All blog posts fetched successfully`);

        logger.info(`[${FILE_NAME}] Sending all blog posts response to client`);
        return res.status(200).json(result);
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch all blog posts`, error);
        logger.warn(`[${FILE_NAME}] Get all blog posts request could not be completed`);
        next(error);
    }
};
// ============================================================
// Get All Blog Posts - ends
// ============================================================



// ============================================================
// Get Four Blog Posts - starts
// ============================================================
const getFourBlogPost = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Get four blog posts request received`);

    try {
        logger.info(`[${FILE_NAME}] Calling blog post read service to fetch four blog posts`);
        const result = await blogPostReadService.getFourBlogPost();

        logger.success(`[${FILE_NAME}] Four blog posts fetched successfully`);

        logger.info(`[${FILE_NAME}] Sending four blog posts response to client`);
        return res.status(200).json(result);
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch four blog posts`, error);
        logger.warn(`[${FILE_NAME}] Get four blog posts request could not be completed`);
        next(error);
    }
};
// ============================================================
// Get Four Blog Posts - ends
// ============================================================



// ============================================================
// Get Particular Blog Post - starts
// ============================================================
const getParticularBlogPost = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Get particular blog post request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        const postID = req.params.postID;

        logger.info(`[${FILE_NAME}] Calling blog post read service to fetch particular blog post`);
        const result = await blogPostReadService.getParticularBlogPost(postID);

        logger.success(`[${FILE_NAME}] Particular blog post fetched successfully`);

        logger.info(`[${FILE_NAME}] Sending particular blog post response to client`);
        return res.status(200).json(result);
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch particular blog post`, error);
        logger.warn(`[${FILE_NAME}] Particular blog post request could not be completed`);
        next(error);
    }
};
// ============================================================
// Get Particular Blog Post - ends
// ============================================================



// ============================================================
// Search Blog Post By Title - starts
// ============================================================
const searchBlogPostByTitle = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Search blog post by title request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting search text from request query`);
        const searchText = req.query.searchText;

        logger.info(`[${FILE_NAME}] Calling blog post read service to search blog posts by title`);
        const result = await blogPostReadService.searchBlogPostByTitle(searchText);

        logger.success(`[${FILE_NAME}] Blog post title search completed successfully`);

        logger.info(`[${FILE_NAME}] Sending blog post search response to client`);
        return res.status(200).json(result);
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to search blog posts by title`, error);
        logger.warn(`[${FILE_NAME}] Blog post title search request could not be completed`);
        next(error);
    }
};
// ============================================================
// Search Blog Post By Title - ends
// ============================================================



// ============================================================
// Get Blog Posts With Pagination - starts
// ============================================================
const getBlogPostWithPagination = async function(req, res, next) {
    logger.info(`[${FILE_NAME}] Get blog posts with pagination request received`);

    try {
        logger.info(`[${FILE_NAME}] Extracting page from request query`);
        const page = parseInt(req.query.page);

        logger.info(`[${FILE_NAME}] Extracting limit from request query`);
        const limit = parseInt(req.query.limit);

        logger.info(`[${FILE_NAME}] Calling blog post read service with pagination parameters`);
        const result = await blogPostReadService.getBlogPostWithPagination(page, limit);

        logger.success(`[${FILE_NAME}] Blog posts with pagination fetched successfully`);

        logger.info(`[${FILE_NAME}] Sending paginated blog posts response to client`);
        return res.status(200).json(result);
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch blog posts with pagination`, error);
        logger.warn(`[${FILE_NAME}] Blog posts with pagination request could not be completed`);
        next(error);
    }
};
// ============================================================
// Get Blog Posts With Pagination - ends
// ============================================================



// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    getAllBlogPosts,
    getFourBlogPost,
    getParticularBlogPost,
    searchBlogPostByTitle,
    getBlogPostWithPagination
};
// ============================================================
// Controller Exports - ends
// ============================================================