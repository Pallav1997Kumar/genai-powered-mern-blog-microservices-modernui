const ErrorMessage = require("../constants/error-message.constant.js");
const SuccessMessage = require("../constants/success-message.constant.js");
const blogPostReadService = require("../services/blog-post-read.service.js");
const devLogger = require("../utils/dev-logger.js");

const FILE_NAME = "blog-post-read.controller.js";



// ============================================================ 
// Get All Blog Posts - starts 
// ============================================================ 
async function getAllBlogPosts(req, res, next) { 
    devLogger.info(`[${FILE_NAME}] Get all blog posts request received`); 
 
    try { 
        devLogger.info(`[${FILE_NAME}] Calling blog post read service to fetch all blog posts`); 
        const result = await blogPostReadService.getAllBlogPost(); 
 
        devLogger.success(`[${FILE_NAME}] All blog posts fetched successfully`); 
        devLogger.info(`[${FILE_NAME}] Sending all blog posts response to client`); 

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.ALL_BLOG_POSTS_FETCHED,
            errorMessage:"",
            resultData:result
        }); 
    } 
    catch(error) { 
        devLogger.error(`[${FILE_NAME}] Failed to fetch all blog posts`, error); 
        devLogger.warn(`[${FILE_NAME}] Get all blog posts request could not be completed`); 

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_ALL_BLOG_POSTS,
            resultData:null
        });
    } 
}; 
// ============================================================ 
// Get All Blog Posts - ends 
// ============================================================ 
 


// ============================================================ 
// Get Four Blog Posts - starts 
// ============================================================ 
async function getFourBlogPost(req, res, next) { 
    devLogger.info(`[${FILE_NAME}] Get four blog posts request received`); 

    try { 
        devLogger.info(`[${FILE_NAME}] Calling blog post read service to fetch four blog posts`); 
        const result = await blogPostReadService.getFourBlogPost(); 
 
        devLogger.success(`[${FILE_NAME}] Four blog posts fetched successfully`);  
        devLogger.info(`[${FILE_NAME}] Sending four blog posts response to client`); 

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.FOUR_BLOG_POSTS_FETCHED,
            errorMessage:"",
            resultData:result
        }); 
    } 
    catch(error) { 
        devLogger.error(`[${FILE_NAME}] Failed to fetch four blog posts`, error); 
        devLogger.warn(`[${FILE_NAME}] Get four blog posts request could not be completed`); 

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_FOUR_BLOG_POSTS,
            resultData:null
        });
    } 
}; 
// ============================================================ 
// Get Four Blog Posts - ends 
// ============================================================ 
 


// ============================================================ 
// Get Particular Blog Post - starts 
// ============================================================ 
async function getParticularBlogPost(req, res, next) { 
    devLogger.info(`[${FILE_NAME}] Get particular blog post request received`); 
 
    try { 
        devLogger.info(`[${FILE_NAME}] Extracting post ID from request parameters`); 
        const postID = req.params.postID; 
 
        devLogger.info(`[${FILE_NAME}] Calling blog post read service to fetch particular blog post`); 
        const result = await blogPostReadService.getParticularBlogPost(postID); 
 
        devLogger.success(`[${FILE_NAME}] Particular blog post fetched successfully`);  
        devLogger.info(`[${FILE_NAME}] Sending particular blog post response to client`); 

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_POST_FETCHED,
            errorMessage:"",
            resultData:result
        }); 
    } 
    catch(error) { 
        devLogger.error(`[${FILE_NAME}] Failed to fetch particular blog post`, error); 
        devLogger.warn(`[${FILE_NAME}] Particular blog post request could not be completed`); 

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_BLOG_POST,
            resultData:null
        });
    } 
}; 
// ============================================================ 
// Get Particular Blog Post - ends 
// ============================================================ 
 


// ============================================================ 
// Search Blog Post By Title - starts 
// ============================================================ 
async function searchBlogPostByTitle(req, res, next) { 
    devLogger.info(`[${FILE_NAME}] Search blog post by title request received`); 

    try { 
        devLogger.info(`[${FILE_NAME}] Extracting search text from request query`); 
        const searchText = req.query.searchText; 
 
        devLogger.info(`[${FILE_NAME}] Calling blog post read service to search blog posts by title`); 
        const result = await blogPostReadService.searchBlogPostByTitle(searchText); 
 
        devLogger.success(`[${FILE_NAME}] Blog post title search completed successfully`); 
        devLogger.info(`[${FILE_NAME}] Sending blog post search response to client`); 

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_POST_TITLE_SEARCH_COMPLETED,
            errorMessage:"",
            resultData:result
        }); 
    } 
    catch(error) { 
        devLogger.error(`[${FILE_NAME}] Failed to search blog posts by title`, error); 
        devLogger.warn(`[${FILE_NAME}] Blog post title search request could not be completed`); 

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_SEARCH_BLOG_POSTS_BY_TITLE,
            resultData:null
        });
    } 
}; 
// ============================================================ 
// Search Blog Post By Title - ends 
// ============================================================ 
 


// ============================================================ 
// Get Blog Posts With Pagination - starts 
// ============================================================ 
async function getBlogPostWithPagination(req, res, next) { 
    devLogger.info(`[${FILE_NAME}] Get blog posts with pagination request received`); 
 
    try { 
        devLogger.info(`[${FILE_NAME}] Extracting page from request query`); 
        const page = parseInt(req.query.page); 
 
        devLogger.info(`[${FILE_NAME}] Extracting limit from request query`); 
        const limit = parseInt(req.query.limit); 
 
        devLogger.info(`[${FILE_NAME}] Calling blog post read service with pagination parameters`); 
        const result = await blogPostReadService.getBlogPostWithPagination(page, limit); 
 
        devLogger.success(`[${FILE_NAME}] Blog posts with pagination fetched successfully`); 
        devLogger.info(`[${FILE_NAME}] Sending paginated blog posts response to client`); 

        return res.status(200).json({
            success:true,
            error:false,
            successMessage:SuccessMessage.BLOG_POSTS_PAGINATED,
            errorMessage:"",
            resultData:result
        }); 
    } 
    catch(error) { 
        devLogger.error(`[${FILE_NAME}] Failed to fetch blog posts with pagination`, error); 
        devLogger.warn(`[${FILE_NAME}] Blog posts with pagination request could not be completed`); 

        return res.status(500).json({
            success:false,
            error:true,
            successMessage:"",
            errorMessage:ErrorMessage.FAILED_TO_FETCH_BLOG_POSTS_PAGINATION,
            resultData:null
        });
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