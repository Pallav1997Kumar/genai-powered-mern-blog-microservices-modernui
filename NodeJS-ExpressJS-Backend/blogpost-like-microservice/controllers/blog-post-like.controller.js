const blogPostLikeService = require("../services/blog-post-like.service.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-like.controller.js";



// ============================================================
// Like Blog Post Starts
// ============================================================
const blogPostLike = async function(req,res){
    logger.info(`==================== [${FILE_NAME}] blogPostLike START ====================`);

    try{
        const token = req.headers.authorization?.split(" ")[1] || req.body.token;
        const postID = req.params.postID;

        const result = await blogPostLikeService.blogPostLike(token, postID);

        logger.info(`[${FILE_NAME}] Blog post liked successfully`);
        logger.info(`==================== [${FILE_NAME}] blogPostLike END ====================`);

        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Error in blogPostLike: ${error.message}`);
        logger.info(`==================== [${FILE_NAME}] blogPostLike END ====================`);

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Like Blog Post Ends
// ============================================================



// ============================================================
// Unlike Blog Post Starts
// ============================================================
const blogPostUnlike = async function(req,res){
    logger.info(`==================== [${FILE_NAME}] blogPostUnlike START ====================`);

    try{
        const token = req.headers.authorization?.split(" ")[1] || req.body.token;
        const postID = req.params.postID;

        const result = await blogPostLikeService.blogPostUnlike(token, postID);

        logger.info(`[${FILE_NAME}] Blog post unliked successfully`);
        logger.info(`==================== [${FILE_NAME}] blogPostUnlike END ====================`);

        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Error in blogPostUnlike: ${error.message}`);
        logger.info(`==================== [${FILE_NAME}] blogPostUnlike END ====================`);

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Unlike Blog Post Ends
// ============================================================



// ============================================================
// Get All Likes For Particular Blog Starts
// ============================================================
const getAllLikesForParticularBlog = async function(req,res){
    logger.info(`==================== [${FILE_NAME}] getAllLikesForParticularBlog START ====================`);

    try{
        const postID = req.params.postID;

        const result = await blogPostLikeService.getAllLikesForParticularBlog(postID);

        logger.info(`[${FILE_NAME}] Blog post likes fetched successfully`);
        logger.info(`==================== [${FILE_NAME}] getAllLikesForParticularBlog END ====================`);

        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Error in getAllLikesForParticularBlog: ${error.message}`);
        logger.info(`==================== [${FILE_NAME}] getAllLikesForParticularBlog END ====================`);

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Get All Likes For Particular Blog Ends
// ============================================================



// ============================================================
// Delete All Likes By User ID Starts
// ============================================================
const deleteAllLikesByUserId = async function(req,res){
    logger.info(`==================== [${FILE_NAME}] deleteAllLikesByUserId START ====================`);

    try{
        const userID = req.params.userID;

        const result = await blogPostLikeService.deleteAllLikesByUserId(userID);

        logger.info(`[${FILE_NAME}] All likes of user deleted successfully`);
        logger.info(`==================== [${FILE_NAME}] deleteAllLikesByUserId END ====================`);

        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Error in deleteAllLikesByUserId: ${error.message}`);
        logger.info(`==================== [${FILE_NAME}] deleteAllLikesByUserId END ====================`);

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Delete All Likes By User ID Ends
// ============================================================



// ============================================================
// Delete All Likes By Post ID Starts
// ============================================================
const deleteAllLikesByPostId = async function(req,res){
    logger.info(`==================== [${FILE_NAME}] deleteAllLikesByPostId START ====================`);

    try{
        const postID = req.params.postID;

        const result = await blogPostLikeService.deleteAllLikesByPostId(postID);

        logger.info(`[${FILE_NAME}] All likes of post deleted successfully`);
        logger.info(`==================== [${FILE_NAME}] deleteAllLikesByPostId END ====================`);

        return res.status(200).json(result);
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Error in deleteAllLikesByPostId: ${error.message}`);
        logger.info(`==================== [${FILE_NAME}] deleteAllLikesByPostId END ====================`);

        return res.status(error.status || 500).json(error.message);
    }
};
// ============================================================
// Delete All Likes By Post ID Ends
// ============================================================




// ============================================================
// Controller Exports Starts
// ============================================================
module.exports = {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog,
    deleteAllLikesByUserId,
    deleteAllLikesByPostId
};
// ============================================================
// Controller Exports Ends
// ============================================================