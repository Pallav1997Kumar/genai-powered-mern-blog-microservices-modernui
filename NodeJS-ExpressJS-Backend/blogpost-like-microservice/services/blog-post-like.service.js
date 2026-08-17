const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const blogPostLikeRepository = require("../repositories/blog-post-like.repository.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-like.service.js";

dotenv.config({path:"./config.env"});

const jwtPrivateKey = process.env.jwtPrivateKey;



// ============================================================
// Like Blog Post - starts
// ============================================================
async function blogPostLike(token, postID) {
    logger.info(`[${FILE_NAME}] Like blog post service started`);

    try {
        if(!token){
            logger.warn(`[${FILE_NAME}] Like post request received without authentication token`);
            throw {
                status:401,
                message:"Not Authenticated"
            };
        }

        logger.info(`[${FILE_NAME}] Verifying authentication token`);
        const userInformation = jwt.verify(token,jwtPrivateKey);
        logger.info(`[${FILE_NAME}] Authentication token verified successfully`);

        const userID = userInformation.id;

        logger.info(`[${FILE_NAME}] Checking whether post is already liked`);
        const existingLike = await blogPostLikeRepository.findLike(userID, postID);

        if(existingLike){
            logger.warn(`[${FILE_NAME}] Post is already liked by the user`);
            throw {
                status:409,
                message:"Post already liked"
            };
        }

        logger.info(`[${FILE_NAME}] Creating blog post like through repository`);
        await blogPostLikeRepository.createLike(userID, postID);

        logger.success(`[${FILE_NAME}] Blog post liked successfully`);
        return "Liked the post successfully";
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to like blog post`, error);
        throw error;
    }
};
// ============================================================
// Like Blog Post - ends
// ============================================================



// ============================================================
// Unlike Blog Post - starts
// ============================================================
async function blogPostUnlike(token, postID) {
    logger.info(`[${FILE_NAME}] Unlike blog post service started`);

    try {
       if(!token){
            logger.warn(`[${FILE_NAME}] Unlike post request received without authentication token`);
            throw {
                status:401,
                message:"Not Authenticated"
            };
        } 

        logger.info(`[${FILE_NAME}] Verifying authentication token`);
        const userInformation = jwt.verify(token,jwtPrivateKey);
        logger.info(`[${FILE_NAME}] Authentication token verified successfully`);

        const userID = userInformation.id;

        logger.info(`[${FILE_NAME}] Deleting blog post like through repository`);
        const result = await blogPostLikeRepository.deleteLike(userID, postID);

        if(!result){
            logger.warn(`[${FILE_NAME}] Like was not found for the requested post`);
            throw {
                status:404,
                message:"Like not found"
            };
        }

        logger.success(`[${FILE_NAME}] Blog post unliked successfully`);
        return "Unliked the post successfully";
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to unlike blog post`, error);
        throw error;
    }  
};
// ============================================================
// Unlike Blog Post - ends
// ============================================================



// ============================================================
// Get All Likes For Particular Blog - starts
// ============================================================
async function getAllLikesForParticularBlog(postID) {
    logger.info(`[${FILE_NAME}] Get all likes for particular blog service started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching blog post likes through repository`);
        const result = await blogPostLikeRepository.getLikesByPostId(postID);

        logger.success(`[${FILE_NAME}] Blog post likes fetched successfully`);
        return result;
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to get all likes for particular blog`, error);
        throw error;
    }
};
// ============================================================
// Get All Likes For Particular Blog - ends
// ============================================================



// ============================================================
// Delete All Likes By User ID - starts
// ============================================================
async function deleteAllLikesByUserId(userID) {
    logger.info(`[${FILE_NAME}] Delete all likes by user service started`);

    try {
        logger.info(`[${FILE_NAME}] Deleting user likes through repository`);
        await blogPostLikeRepository.deleteLikesByUserId(userID);

        logger.success(`[${FILE_NAME}] All likes of user deleted successfully`);
        return "All likes of user deleted successfully";
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to delete all likes by user ID`, error);
        throw error;
    }
};
// ============================================================
// Delete All Likes By User ID - ends
// ============================================================



// ============================================================
// Delete All Likes By Post ID - starts
// ============================================================
async function deleteAllLikesByPostId(postID) {
    logger.info(`[${FILE_NAME}] Delete all likes by post service started`);

    try {
        logger.info(`[${FILE_NAME}] Deleting post likes through repository`);
        await blogPostLikeRepository.deleteLikesByPostId(postID);

        logger.success(`[${FILE_NAME}] All likes of post deleted successfully`);
        return "All likes of post deleted successfully";
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to delete all likes by post ID`, error);
        throw error;
    } 
};
// ============================================================
// Delete All Likes By Post ID - ends
// ============================================================



// ============================================================
// Service Exports
// ============================================================
module.exports = {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog,
    deleteAllLikesByUserId,
    deleteAllLikesByPostId
};