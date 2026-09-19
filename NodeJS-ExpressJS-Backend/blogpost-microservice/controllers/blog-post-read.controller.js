const dotenv = require("dotenv");

const blogPostReadService = require("../services/blog-post-read.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-read.controller.js";



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
// Get All Blog Posts - starts 
// ============================================================ 
async function getAllBlogPosts(req, res, next) { 
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get all blog posts request received`); 
    }
 
    try { 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post read service to fetch all blog posts`); 
        }

        const result = await blogPostReadService.getAllBlogPost(); 
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] All blog posts fetched successfully`); 
        }
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending all blog posts response to client`); 
        }

        return res.status(200).json(result); 
    } 
    catch(error) { 
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch all blog posts`, error); 
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Get all blog posts request could not be completed`); 
        }

        next(error); 
    } 
}; 
// ============================================================ 
// Get All Blog Posts - ends 
// ============================================================ 
 
 
 
// ============================================================ 
// Get Four Blog Posts - starts 
// ============================================================ 
async function getFourBlogPost(req, res, next) { 
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get four blog posts request received`); 
    }
 
    try { 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post read service to fetch four blog posts`); 
        }

        const result = await blogPostReadService.getFourBlogPost(); 
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Four blog posts fetched successfully`); 
        }
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending four blog posts response to client`); 
        }

        return res.status(200).json(result); 
    } 
    catch(error) { 
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch four blog posts`, error); 
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Get four blog posts request could not be completed`); 
        }

        next(error); 
    } 
}; 
// ============================================================ 
// Get Four Blog Posts - ends 
// ============================================================ 
 
 
 
// ============================================================ 
// Get Particular Blog Post - starts 
// ============================================================ 
async function getParticularBlogPost(req, res, next) { 
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get particular blog post request received`); 
    }
 
    try { 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`); 
        }

        const postID = req.params.postID; 
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post read service to fetch particular blog post`); 
        }

        const result = await blogPostReadService.getParticularBlogPost(postID); 
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Particular blog post fetched successfully`); 
        }
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending particular blog post response to client`); 
        }

        return res.status(200).json(result); 
    } 
    catch(error) { 
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch particular blog post`, error); 
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Particular blog post request could not be completed`); 
        }

        next(error); 
    } 
}; 
// ============================================================ 
// Get Particular Blog Post - ends 
// ============================================================ 
 
 
 
// ============================================================ 
// Search Blog Post By Title - starts 
// ============================================================ 
async function searchBlogPostByTitle(req, res, next) { 
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Search blog post by title request received`); 
    }
 
    try { 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting search text from request query`); 
        }

        const searchText = req.query.searchText; 
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post read service to search blog posts by title`); 
        }

        const result = await blogPostReadService.searchBlogPostByTitle(searchText); 
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Blog post title search completed successfully`); 
        }
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending blog post search response to client`); 
        }

        return res.status(200).json(result); 
    } 
    catch(error) { 
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to search blog posts by title`, error); 
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Blog post title search request could not be completed`); 
        }

        next(error); 
    } 
}; 
// ============================================================ 
// Search Blog Post By Title - ends 
// ============================================================ 
 
 
 
// ============================================================ 
// Get Blog Posts With Pagination - starts 
// ============================================================ 
async function getBlogPostWithPagination(req, res, next) { 
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get blog posts with pagination request received`); 
    }
 
    try { 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting page from request query`); 
        }

        const page = parseInt(req.query.page); 
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting limit from request query`); 
        }

        const limit = parseInt(req.query.limit); 
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post read service with pagination parameters`); 
        }

        const result = await blogPostReadService.getBlogPostWithPagination(page, limit); 
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Blog posts with pagination fetched successfully`); 
        }
 
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Sending paginated blog posts response to client`); 
        }

        return res.status(200).json(result); 
    } 
    catch(error) { 
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch blog posts with pagination`, error); 
        }

        if(process.env.environment == "DEVELOPMENT"){
            logger.warn(`[${FILE_NAME}] Blog posts with pagination request could not be completed`); 
        }

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
