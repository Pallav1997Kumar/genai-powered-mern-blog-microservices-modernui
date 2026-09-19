const dotenv = require("dotenv");

const blogPostLikeService = require("../services/blog-post-like.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-like.controller.js";



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
// Like Blog Post - starts
// ============================================================
async function blogPostLike(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Blog post like request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting authentication token and post ID`);
        }

        const token = req.headers.authorization?.split(" ")[1] || req.body.token;
        const postID = req.params.postID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post like service to like post`);
        }

        const result = await blogPostLikeService.blogPostLike(token, postID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Blog post liked successfully`);
            logger.info(`[${FILE_NAME}] Sending like post response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to like blog post`, error);
            logger.warn(`[${FILE_NAME}] Blog post like request could not be completed`);
        }

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Like Blog Post - ends
// ============================================================



// ============================================================
// Unlike Blog Post - starts
// ============================================================
async function blogPostUnlike(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Blog post unlike request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting authentication token and post ID`);
        }

        const token = req.headers.authorization?.split(" ")[1] || req.body.token;
        const postID = req.params.postID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post like service to unlike post`);
        }

        const result = await blogPostLikeService.blogPostUnlike(token, postID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] Blog post unliked successfully`);
            logger.info(`[${FILE_NAME}] Sending unlike post response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to unlike blog post`, error);
            logger.warn(`[${FILE_NAME}] Blog post unlike request could not be completed`);
        }

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Unlike Blog Post - ends
// ============================================================



// ============================================================
// Get All Likes For Particular Blog - starts
// ============================================================
async function getAllLikesForParticularBlog(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Get all likes for particular blog request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        }

        const postID = req.params.postID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post like service to fetch likes`);
        }

        const result = await blogPostLikeService.getAllLikesForParticularBlog(postID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] All blog post likes fetched successfully`);
            logger.info(`[${FILE_NAME}] Sending likes response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to fetch likes for particular blog`, error);
            logger.warn(`[${FILE_NAME}] Get likes request could not be completed`);
        }

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Get All Likes For Particular Blog - ends
// ============================================================



// ============================================================
// Delete All Likes By User ID - starts
// ============================================================
async function deleteAllLikesByUserId(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Delete all likes by user ID request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting user ID from request parameters`);
        }

        const userID = req.params.userID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post like service to delete user likes`);
        }

        const result = await blogPostLikeService.deleteAllLikesByUserId(userID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] All likes by user deleted successfully`);
            logger.info(`[${FILE_NAME}] Sending delete user likes response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to delete all likes by user`, error);
            logger.warn(`[${FILE_NAME}] Delete user likes request could not be completed`);
        }

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Delete All Likes By User ID - ends
// ============================================================



// ============================================================
// Delete All Likes By Post ID - starts
// ============================================================
async function deleteAllLikesByPostId(req,res){
    if(process.env.environment == "DEVELOPMENT"){
        logger.info(`[${FILE_NAME}] Delete all likes by post ID request received`);
    }

    try{
        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Extracting post ID from request parameters`);
        }

        const postID = req.params.postID;

        if(process.env.environment == "DEVELOPMENT"){
            logger.info(`[${FILE_NAME}] Calling blog post like service to delete post likes`);
        }

        const result = await blogPostLikeService.deleteAllLikesByPostId(postID);

        if(process.env.environment == "DEVELOPMENT"){
            logger.success(`[${FILE_NAME}] All likes by post deleted successfully`);
            logger.info(`[${FILE_NAME}] Sending delete post likes response to client`);
        }

        return res.status(200).json(result);
    }
    catch(error){
        if(process.env.environment == "DEVELOPMENT"){
            logger.error(`[${FILE_NAME}] Failed to delete all likes by post`, error);
            logger.warn(`[${FILE_NAME}] Delete post likes request could not be completed`);
        }

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Delete All Likes By Post ID - ends
// ============================================================




// ============================================================
// Controller Exports - starts
// ============================================================
module.exports = {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog,
    deleteAllLikesByUserId,
    deleteAllLikesByPostId
};
// ============================================================
// Controller Exports - ends
// ============================================================
