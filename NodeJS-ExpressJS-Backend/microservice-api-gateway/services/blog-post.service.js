const httpClient = require("../utils/httpClient.js");
const logger = require("../utils/logger.js");

const {
    BLOG_POST_SERVICE
} = require("../config/services.js");


const FILE_NAME = "blog-post.service.js";



// ===============================
// Category Routes
// ===============================


// ============================================================
// Get Four Blog Posts By Category Code Starts
// ============================================================
const getFourBlogPostByCategory = async function(categoryID){
    logger.info(`[${FILE_NAME}] Get four blog posts by category request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service to fetch four posts by category`);

        const response = await httpClient.get(
            `${BLOG_POST_SERVICE}/api/blog-post/category/four-blog-post/${categoryID}`
        );

        logger.info(`[${FILE_NAME}] Four blog posts by category response received successfully`);
        logger.success(`[${FILE_NAME}] Four blog posts by category fetched successfully`);

        logger.info(`[${FILE_NAME}] Returning four blog posts by category response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch four blog posts by category`, error);
        logger.warn(`[${FILE_NAME}] Get four blog posts by category request could not be completed`);

        throw {
            message:"Failed to fetch four blog posts by category",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Get Four Blog Posts By Category Code Ends
// ============================================================



// ============================================================
// Get Category Posts With Pagination Code Starts
// ============================================================
const getCategoryPostPagination = async function(categoryID, params = {}){
    logger.info(`[${FILE_NAME}] Get category posts with pagination request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service for category post pagination`);

        const response = await httpClient.get(
            `${BLOG_POST_SERVICE}/api/blog-post/category/pagination/${categoryID}`,
            {
                params
            }
        );

        logger.info(`[${FILE_NAME}] Category post pagination response received successfully`);
        logger.success(`[${FILE_NAME}] Category posts pagination fetched successfully`);

        logger.info(`[${FILE_NAME}] Returning category post pagination response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch category posts pagination`, error);
        logger.warn(`[${FILE_NAME}] Category post pagination request could not be completed`);

        throw {
            message:"Failed to fetch category posts pagination",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Get Category Posts With Pagination Code Ends
// ============================================================



// ============================================================
// Get Unique Category IDs Code Starts
// ============================================================
const getUniqueCategoryIds = async function(){
    logger.info(`[${FILE_NAME}] Get unique category IDs request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service to fetch unique category IDs`);

        const response = await httpClient.get(
            `${BLOG_POST_SERVICE}/api/blog-post/category/unique-category-ids`
        );

        logger.info(`[${FILE_NAME}] Unique category IDs response received successfully`);
        logger.success(`[${FILE_NAME}] Unique category IDs fetched successfully`);

        logger.info(`[${FILE_NAME}] Returning unique category IDs response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch unique category IDs`, error);
        logger.warn(`[${FILE_NAME}] Get unique category IDs request could not be completed`);

        throw {
            message:"Failed to fetch unique category IDs",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Get Unique Category IDs Code Ends
// ============================================================



// ============================================================
// Get Unique Users By Category Code Starts
// ============================================================
const getUniqueUsersByCategory = async function(categoryID){
    logger.info(`[${FILE_NAME}] Get unique users by category request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service to fetch unique users by category`);

        const response = await httpClient.get(
            `${BLOG_POST_SERVICE}/api/blog-post/category/unique-users/${categoryID}`
        );

        logger.info(`[${FILE_NAME}] Unique users by category response received successfully`);
        logger.success(`[${FILE_NAME}] Unique users by category fetched successfully`);

        logger.info(`[${FILE_NAME}] Returning unique users by category response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch unique users by category`, error);
        logger.warn(`[${FILE_NAME}] Get unique users by category request could not be completed`);

        throw {
            message:"Failed to fetch unique users by category",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Get Unique Users By Category Code Ends
// ============================================================



// ===============================
// Filter Sort Routes
// ===============================


// ============================================================
// Filter Sort Pagination Code Starts
// ============================================================
const filterSortPagination = async function(data){
    logger.info(`[${FILE_NAME}] Filter and sort pagination request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service for filter and sort pagination`);

        const response = await httpClient.post(
            `${BLOG_POST_SERVICE}/api/blog-post/filter-sort/filter-sort-pagination`,
            data
        );

        logger.info(`[${FILE_NAME}] Filter and sort pagination response received successfully`);
        logger.success(`[${FILE_NAME}] Blog post filter and sort pagination completed successfully`);

        logger.info(`[${FILE_NAME}] Returning filter and sort pagination response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to filter and sort blog posts`, error);
        logger.warn(`[${FILE_NAME}] Filter and sort blog posts request could not be completed`);

        throw {
            message:"Failed to filter and sort blog posts",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Filter Sort Pagination Code Ends
// ============================================================



// ============================================================
// Filter Sort Pagination By User Code Starts
// ============================================================
const filterSortPaginationByUser = async function(userID, data){
    logger.info(`[${FILE_NAME}] Filter and sort pagination by user request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service for user filter and sort pagination`);

        const response = await httpClient.post(
            `${BLOG_POST_SERVICE}/api/blog-post/filter-sort/filter-sort-pagination/user/${userID}`,
            data
        );

        logger.info(`[${FILE_NAME}] User filter and sort pagination response received successfully`);
        logger.success(`[${FILE_NAME}] User blog post filter and sort pagination completed successfully`);

        logger.info(`[${FILE_NAME}] Returning user filter and sort pagination response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to filter user blog posts`, error);
        logger.warn(`[${FILE_NAME}] User blog post filter and sort request could not be completed`);

        throw {
            message:"Failed to filter user blog posts",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Filter Sort Pagination By User Code Ends
// ============================================================



// ============================================================
// Filter Sort Pagination By Category Code Starts
// ============================================================
const filterSortPaginationByCategory = async function(categoryID, data){
    logger.info(`[${FILE_NAME}] Filter and sort pagination by category request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service for category filter and sort pagination`);

        const response = await httpClient.post(
            `${BLOG_POST_SERVICE}/api/blog-post/filter-sort/filter-sort-pagination/category/${categoryID}`,
            data
        );

        logger.info(`[${FILE_NAME}] Category filter and sort pagination response received successfully`);
        logger.success(`[${FILE_NAME}] Category blog post filter and sort pagination completed successfully`);

        logger.info(`[${FILE_NAME}] Returning category filter and sort pagination response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to filter category blog posts`, error);
        logger.warn(`[${FILE_NAME}] Category blog post filter and sort request could not be completed`);

        throw {
            message:"Failed to filter category blog posts",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Filter Sort Pagination By Category Code Ends
// ============================================================



// ===============================
// Read Routes
// ===============================


// ============================================================
// Get All Blog Posts Code Starts
// ============================================================
const getAllBlogPosts = async function(){
    logger.info(`[${FILE_NAME}] Get all blog posts request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service to fetch all blog posts`);

        const response = await httpClient.get(
            `${BLOG_POST_SERVICE}/api/blog-post/read/all-blog-post`
        );

        logger.info(`[${FILE_NAME}] All blog posts response received successfully`);
        logger.success(`[${FILE_NAME}] All blog posts fetched successfully`);

        logger.info(`[${FILE_NAME}] Returning all blog posts response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch blog posts`, error);
        logger.warn(`[${FILE_NAME}] Get all blog posts request could not be completed`);

        throw {
            message:"Failed to fetch blog posts",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Get All Blog Posts Code Ends
// ============================================================



// ============================================================
// Get Four Blog Posts Code Starts
// ============================================================
const getFourBlogPosts = async function(){
    logger.info(`[${FILE_NAME}] Get four blog posts request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service to fetch four blog posts`);

        const response = await httpClient.get(
            `${BLOG_POST_SERVICE}/api/blog-post/read/four-blog-post`
        );

        logger.info(`[${FILE_NAME}] Four blog posts response received successfully`);
        logger.success(`[${FILE_NAME}] Four blog posts fetched successfully`);

        logger.info(`[${FILE_NAME}] Returning four blog posts response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch blog posts`, error);
        logger.warn(`[${FILE_NAME}] Get four blog posts request could not be completed`);

        throw {
            message:"Failed to fetch blog posts",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Get Four Blog Posts Code Ends
// ============================================================



// ============================================================
// Get Blog Post By ID Code Starts
// ============================================================
const getBlogPostById = async function(postID){
    logger.info(`[${FILE_NAME}] Get blog post by ID request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service to fetch blog post by ID`);

        const response = await httpClient.get(
            `${BLOG_POST_SERVICE}/api/blog-post/read/post/${postID}`
        );

        logger.info(`[${FILE_NAME}] Blog post by ID response received successfully`);
        logger.success(`[${FILE_NAME}] Blog post fetched successfully`);

        logger.info(`[${FILE_NAME}] Returning blog post by ID response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch blog post`, error);
        logger.warn(`[${FILE_NAME}] Get blog post by ID request could not be completed`);

        throw {
            message:"Failed to fetch blog post",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Get Blog Post By ID Code Ends
// ============================================================



// ============================================================
// Get Blog Post Pagination Code Starts
// ============================================================
const getBlogPostPagination = async function(params = {}){
    logger.info(`[${FILE_NAME}] Get blog post pagination request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service for blog post pagination`);

        const response = await httpClient.get(
            `${BLOG_POST_SERVICE}/api/blog-post/read/pagination`,
            {
                params
            }
        );

        logger.info(`[${FILE_NAME}] Blog post pagination response received successfully`);
        logger.success(`[${FILE_NAME}] Blog post pagination fetched successfully`);

        logger.info(`[${FILE_NAME}] Returning blog post pagination response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch blog post pagination`, error);
        logger.warn(`[${FILE_NAME}] Blog post pagination request could not be completed`);

        throw {
            message:"Failed to fetch blog post pagination",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Get Blog Post Pagination Code Ends
// ============================================================



// ============================================================
// Search Blog Posts By Title Code Starts
// ============================================================
const searchBlogPostByTitle = async function(searchText) {
    logger.info(`[${FILE_NAME}] Search blog posts by title request started`);

    try {
        logger.info(`[${FILE_NAME}] Calling blog post service to search blog posts by title`);

        const response = await httpClient.get(
            `${BLOG_POST_SERVICE}/api/blog-post/read/search-by-title?searchText=${searchText}`
        );

        logger.info(`[${FILE_NAME}] Blog post title search response received successfully`);
        logger.success(`[${FILE_NAME}] Blog post title search completed successfully`);

        logger.info(`[${FILE_NAME}] Returning blog post title search response`);

        return response.data;
    } 
    catch (error) {
        logger.error(`[${FILE_NAME}] Failed to search blog posts by title`, error);
        logger.warn(`[${FILE_NAME}] Blog post title search request could not be completed`);

        throw {
            message: "Failed to search blog posts by title",
            status: error.response?.status || 500,
            data: error.response?.data || error.message
        };
    }
};
// ============================================================
// Search Blog Posts By Title Code Ends
// ============================================================



// ===============================
// User Routes
// ===============================


// ============================================================
// Get User Posts Pagination Code Starts
// ============================================================
const getUserPostPagination = async function(userID, params = {}){
    logger.info(`[${FILE_NAME}] Get user posts pagination request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service for user posts pagination`);

        const response = await httpClient.get(
            `${BLOG_POST_SERVICE}/api/blog-post/user/pagination/userId/${userID}`,
            {
                params
            }
        );

        logger.info(`[${FILE_NAME}] User posts pagination response received successfully`);
        logger.success(`[${FILE_NAME}] User posts pagination fetched successfully`);

        logger.info(`[${FILE_NAME}] Returning user posts pagination response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch user posts`, error);
        logger.warn(`[${FILE_NAME}] User posts pagination request could not be completed`);

        throw {
            message:"Failed to fetch user posts",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Get User Posts Pagination Code Ends
// ============================================================



// ============================================================
// Get Unique User IDs Code Starts
// ============================================================
const getUniqueUserIds = async function(){
    logger.info(`[${FILE_NAME}] Get unique user IDs request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service to fetch unique user IDs`);

        const response = await httpClient.get(
            `${BLOG_POST_SERVICE}/api/blog-post/user/unique-user-ids`
        );

        logger.info(`[${FILE_NAME}] Unique user IDs response received successfully`);
        logger.success(`[${FILE_NAME}] Unique user IDs fetched successfully`);

        logger.info(`[${FILE_NAME}] Returning unique user IDs response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch unique user IDs`, error);
        logger.warn(`[${FILE_NAME}] Get unique user IDs request could not be completed`);

        throw {
            message:"Failed to fetch unique user IDs",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Get Unique User IDs Code Ends
// ============================================================



// ============================================================
// Get Unique Categories By User Code Starts
// ============================================================
const getUniqueCategoriesByUser = async function(userID){
    logger.info(`[${FILE_NAME}] Get unique categories by user request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service to fetch unique user categories`);

        const response = await httpClient.get(
            `${BLOG_POST_SERVICE}/api/blog-post/user/unique-categories/userId/${userID}`
        );

        logger.info(`[${FILE_NAME}] Unique categories by user response received successfully`);
        logger.success(`[${FILE_NAME}] Unique categories by user fetched successfully`);

        logger.info(`[${FILE_NAME}] Returning unique categories by user response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to fetch user categories`, error);
        logger.warn(`[${FILE_NAME}] Get unique categories by user request could not be completed`);

        throw {
            message:"Failed to fetch user categories",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Get Unique Categories By User Code Ends
// ============================================================



// ===============================
// Write Routes
// ===============================


// ============================================================
// Add Blog Post Code Starts
// ============================================================
const addBlogPost = async function(data, token){
    logger.info(`[${FILE_NAME}] Add blog post request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service to create blog post`);

        const response = await httpClient.post(
            `${BLOG_POST_SERVICE}/api/blog-post/write/add`,
            data,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        logger.info(`[${FILE_NAME}] Blog post service returned add post response successfully`);
        logger.success(`[${FILE_NAME}] Blog post created successfully`);

        logger.info(`[${FILE_NAME}] Returning add blog post response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to create blog post`, error);
        logger.warn(`[${FILE_NAME}] Add blog post request could not be completed`);

        throw {
            message:"Failed to create blog post",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Add Blog Post Code Ends
// ============================================================



// ============================================================
// Delete Blog Post Code Starts
// ============================================================
const deleteBlogPost = async function(postID, token){
    logger.warn(`[${FILE_NAME}] Delete blog post request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service to delete blog post`);

        const response = await httpClient.delete(
            `${BLOG_POST_SERVICE}/api/blog-post/write/delete/postId/${postID}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        logger.info(`[${FILE_NAME}] Blog post service returned delete post response successfully`);
        logger.success(`[${FILE_NAME}] Blog post deleted successfully`);

        logger.info(`[${FILE_NAME}] Returning delete blog post response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to delete blog post`, error);
        logger.warn(`[${FILE_NAME}] Delete blog post request could not be completed`);

        throw {
            message:"Failed to delete blog post",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Delete Blog Post Code Ends
// ============================================================



// ============================================================
// Delete Posts By User Code Starts
// ============================================================
const deleteBlogPostsByUser = async function(userID, token){
    logger.warn(`[${FILE_NAME}] Delete blog posts by user request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service to delete user blog posts`);

        const response = await httpClient.delete(
            `${BLOG_POST_SERVICE}/api/blog-post/write/delete-by-user/userId/${userID}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        logger.info(`[${FILE_NAME}] Blog post service returned delete user posts response successfully`);
        logger.success(`[${FILE_NAME}] User blog posts deleted successfully`);

        logger.info(`[${FILE_NAME}] Returning delete user blog posts response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to delete user blog posts`, error);
        logger.warn(`[${FILE_NAME}] Delete user blog posts request could not be completed`);

        throw {
            message:"Failed to delete user blog posts",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Delete Posts By User Code Ends
// ============================================================



// ============================================================
// Update Blog Post Code Starts
// ============================================================
const updateBlogPost = async function(postID, data, token){
    logger.info(`[${FILE_NAME}] Update blog post request started`);

    try{
        logger.info(`[${FILE_NAME}] Calling blog post service to update blog post`);

        const response = await httpClient.put(
            `${BLOG_POST_SERVICE}/api/blog-post/write/update/postId/${postID}`,
            data,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        logger.info(`[${FILE_NAME}] Blog post service returned update post response successfully`);
        logger.success(`[${FILE_NAME}] Blog post updated successfully`);

        logger.info(`[${FILE_NAME}] Returning update blog post response`);

        return response.data;
    }
    catch(error){
        logger.error(`[${FILE_NAME}] Failed to update blog post`, error);
        logger.warn(`[${FILE_NAME}] Update blog post request could not be completed`);

        throw {
            message:"Failed to update blog post",
            status:error.response?.status || 500,
            data:error.response?.data || error.message
        };
    }
};
// ============================================================
// Update Blog Post Code Ends
// ============================================================



// ============================================================
// Service Exports
// ============================================================
module.exports = {
    getFourBlogPostByCategory,
    getCategoryPostPagination,
    getUniqueCategoryIds,
    getUniqueUsersByCategory,

    filterSortPagination,
    filterSortPaginationByUser,
    filterSortPaginationByCategory,

    getAllBlogPosts,
    getFourBlogPosts,
    getBlogPostById,
    getBlogPostPagination,
    searchBlogPostByTitle,

    getUserPostPagination,
    getUniqueUserIds,
    getUniqueCategoriesByUser,

    addBlogPost,
    deleteBlogPost,
    deleteBlogPostsByUser,
    updateBlogPost
};
// ============================================================
// Service Exports Ends
// ============================================================