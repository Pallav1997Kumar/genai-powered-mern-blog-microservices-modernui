const httpClient = require("../utils/httpClient.js");
const logger = require("../utils/logger.js");

const { 
    BLOG_LIKE_SERVICE 
} = require("../config/services");


const FILE_NAME = "blog-post-like.service.js";



// ============================================================
// Like Blog Post Code Starts
// ============================================================
const blogPostLike = async function(postID, token){
    logger.info(`[${FILE_NAME}] Like blog post request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog like service to like blog post`);

        const response = await httpClient.post(
            `${BLOG_LIKE_SERVICE}/api/blog-like/post/${postID}`,
            {},
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        logger.info(`[${FILE_NAME}] Blog like service returned like response successfully`);
        logger.success(`[${FILE_NAME}] Blog post liked successfully`);

        logger.info(`[${FILE_NAME}] Returning like blog post response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to like blog post`, error);
        logger.warn(`[${FILE_NAME}] Like blog post request could not be completed`);

        throw {
            message:"Failed to like blog post",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Like Blog Post Code Ends
// ============================================================



// ============================================================
// Unlike Blog Post Code Starts
// ============================================================
const blogPostUnlike = async function(postID, token){
    logger.warn(`[${FILE_NAME}] Unlike blog post request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog like service to unlike blog post`);

        const response = await httpClient.delete(
            `${BLOG_LIKE_SERVICE}/api/blog-like/post/${postID}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        logger.info(`[${FILE_NAME}] Blog like service returned unlike response successfully`);
        logger.success(`[${FILE_NAME}] Blog post unliked successfully`);

        logger.info(`[${FILE_NAME}] Returning unlike blog post response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to unlike blog post`, error);
        logger.warn(`[${FILE_NAME}] Unlike blog post request could not be completed`);

        throw {
            message:"Failed to unlike blog post",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Unlike Blog Post Code Ends
// ============================================================



// ============================================================
// Get All Likes For Blog Post Code Starts
// ============================================================
const getAllLikesForParticularBlog = async function(postID){
    logger.info(`[${FILE_NAME}] Get all likes for blog post request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog like service to fetch blog post likes`);

        const response = await httpClient.get(
            `${BLOG_LIKE_SERVICE}/api/blog-like/post/${postID}`
        );

        logger.info(`[${FILE_NAME}] Blog like service returned blog post likes successfully`);
        logger.success(`[${FILE_NAME}] Blog post likes fetched successfully`);

        logger.info(`[${FILE_NAME}] Returning blog post likes response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch blog post likes`, error);
        logger.warn(`[${FILE_NAME}] Get blog post likes request could not be completed`);

        throw {
            message:"Failed to fetch blog post likes",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Get All Likes For Blog Post Code Ends
// ============================================================



// ============================================================
// Delete All Likes By User ID Code Starts
// ============================================================
const deleteLikesByUserId = async function(userID, token){
    logger.warn(`[${FILE_NAME}] Delete all likes by user ID request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog like service to delete user likes`);

        const response = await httpClient.delete(
            `${BLOG_LIKE_SERVICE}/api/blog-like/user/${userID}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        logger.info(`[${FILE_NAME}] Blog like service returned delete user likes response successfully`);
        logger.success(`[${FILE_NAME}] User likes deleted successfully`);

        logger.info(`[${FILE_NAME}] Returning delete user likes response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to delete user likes`, error);
        logger.warn(`[${FILE_NAME}] Delete user likes request could not be completed`);

        throw {
            message:"Failed to delete user likes",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Delete All Likes By User ID Code Ends
// ============================================================



// ============================================================
// Delete All Likes For Blog Post Code Starts
// ============================================================
const deleteAllLikesForPost = async function(postID, token){
    logger.warn(`[${FILE_NAME}] Delete all likes for blog post request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog like service to delete all post likes`);

        const response = await httpClient.delete(
            `${BLOG_LIKE_SERVICE}/api/blog-like/post/${postID}/all`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        logger.info(`[${FILE_NAME}] Blog like service returned delete all post likes response successfully`);
        logger.success(`[${FILE_NAME}] All blog post likes deleted successfully`);

        logger.info(`[${FILE_NAME}] Returning delete all post likes response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to delete all likes for post`, error);
        logger.warn(`[${FILE_NAME}] Delete all post likes request could not be completed`);

        throw {
            message:"Failed to delete all likes for post",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Delete All Likes For Blog Post Code Ends
// ============================================================



// ============================================================
// Service Exports
// ============================================================
module.exports = {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog,
    deleteLikesByUserId,
    deleteAllLikesForPost
};
// ============================================================
// Service Exports Ends
// ============================================================