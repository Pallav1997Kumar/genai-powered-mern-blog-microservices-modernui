const BlogPost = require("../database-models/blog-post.model.js");
const logger = require("../utils/logger.js");

const mongoose = require("mongoose");

const FILE_NAME = "blog-post.repository.js";



// ============================================================
// Create New Blog Post - starts
// ============================================================
async function createBlogPost(data) {
    logger.info(`[${FILE_NAME}] Create new blog post request started`);

    try {
        logger.info(`[${FILE_NAME}] Creating new blog post in database`);
        const result = await BlogPost.create(data);

        logger.success(`[${FILE_NAME}] Blog post created successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to create blog post`, error);
        throw error;
    }
}
// ============================================================
// Create New Blog Post - ends
// ============================================================



// ============================================================
// Delete Blog Post By ID - starts
// ============================================================
async function deleteBlogPostById(postID) {
    logger.info(`[${FILE_NAME}] Delete blog post by ID request started`);

    try {
        logger.info(`[${FILE_NAME}] Searching and deleting blog post by ID`);
        const result = await BlogPost.findByIdAndDelete(postID);

        if (!result) {
            logger.warn(`[${FILE_NAME}] Blog post not found for provided ID`);
        }
        else {
            logger.success(`[${FILE_NAME}] Blog post deleted successfully`);
        }

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to delete blog post by ID`, error);
        throw error;
    }
}
// ============================================================
// Delete Blog Post By ID - ends
// ============================================================



// ============================================================
// Update Blog Post By ID - starts
// ============================================================
async function updateBlogPostById(postID, data) {
    logger.info(`[${FILE_NAME}] Update blog post by ID request started`);

    try {
        logger.info(`[${FILE_NAME}] Updating blog post by ID`);

        const result = await BlogPost.findByIdAndUpdate(
            postID,
            {
                $set: data
            },
            {
                new: true
            }
        );

        if (!result) {
            logger.warn(`[${FILE_NAME}] Blog post not found for provided ID`);
        }
        else {
            logger.success(`[${FILE_NAME}] Blog post updated successfully`);
        }

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to update blog post by ID`, error);
        throw error;
    }
}
// ============================================================
// Update Blog Post By ID - ends
// ============================================================



// ============================================================
// Delete Blog Posts By User ID - starts
// ============================================================
async function deleteBlogPostByUserId(userID) {
    logger.info(`[${FILE_NAME}] Delete blog posts by user ID request started`);

    try {
        logger.info(`[${FILE_NAME}] Deleting blog posts belonging to user`);

        const result = await BlogPost.deleteMany({
            userID: userID
        });

        logger.success(`[${FILE_NAME}] Blog posts deleted by user ID successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to delete blog posts by user ID`, error);
        throw error;
    }
}
// ============================================================
// Delete Blog Posts By User ID - ends
// ============================================================



// ============================================================
// Find Unique Categories By User - starts
// ============================================================
async function findUniqueCategoriesByUser(userID) {
    logger.info(`[${FILE_NAME}] Get unique categories by user request started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching unique category IDs for user`);

        const result = await BlogPost.distinct(
            "categoryID",
            {
                userID: userID
            }
        );

        logger.success(`[${FILE_NAME}] Unique categories by user fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch unique categories by user`, error);
        throw error;
    }
}
// ============================================================
// Find Unique Categories By User - ends
// ============================================================



// ============================================================
// Find Unique Blog Post User IDs - starts
// ============================================================
async function findUniqueBlogPostUserIds() {
    logger.info(`[${FILE_NAME}] Get unique blog post user IDs request started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching unique user IDs from blog posts`);

        const result = await BlogPost.distinct("userID");

        logger.success(`[${FILE_NAME}] Unique blog post user IDs fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch unique blog post user IDs`, error);
        throw error;
    }
}
// ============================================================
// Find Unique Blog Post User IDs - ends
// ============================================================



// ============================================================
// Count Blog Posts By User - starts
// ============================================================
async function countBlogPostByUser(userID) {
    logger.info(`[${FILE_NAME}] Count blog posts by user request started`);

    try {
        logger.info(`[${FILE_NAME}] Counting blog posts belonging to user`);

        const result = await BlogPost.countDocuments({
            userID: userID
        });

        logger.success(`[${FILE_NAME}] Blog posts by user counted successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to count blog posts by user`, error);
        throw error;
    }
}
// ============================================================
// Count Blog Posts By User - ends
// ============================================================



// ============================================================
// Find Blog Posts By User With Pagination - starts
// ============================================================
async function findBlogPostByUserWithPagination(userID, skip, limit) {
    logger.info(`[${FILE_NAME}] Get blog posts by user with pagination request started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching blog posts by user with pagination`);

        const result = await BlogPost.find({
            userID: userID
        })
        .skip(skip)
        .limit(limit)
        .select(
            "_id postTitle postDescription postImage postDateTime userID categoryID"
        );

        logger.success(`[${FILE_NAME}] Blog posts by user fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch blog posts by user`, error);
        throw error;
    }
}
// ============================================================
// Find Blog Posts By User With Pagination - ends
// ============================================================



// ============================================================
// Find All Blog Posts - starts
// ============================================================
async function findAllBlogPosts() {
    logger.info(`[${FILE_NAME}] Get all blog posts request started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching all blog posts from database`);

        const result = await BlogPost.find()
            .select(
                "_id postTitle postDescription postImage userID categoryID"
            );

        logger.success(`[${FILE_NAME}] All blog posts fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch all blog posts`, error);
        throw error;
    }
}
// ============================================================
// Find All Blog Posts - ends
// ============================================================



// ============================================================
// Find Four Blog Posts - starts
// ============================================================
async function findFourBlogPosts() {
    logger.info(`[${FILE_NAME}] Get four latest blog posts request started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching four blog posts from database`);

        const result = await BlogPost.find()
            .limit(4)
            .select(
                "_id postTitle postDescription postImage userID categoryID"
            );

        logger.success(`[${FILE_NAME}] Four blog posts fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch four blog posts`, error);
        throw error;
    }
}
// ============================================================
// Find Four Blog Posts - ends
// ============================================================



// ============================================================
// Count Blog Posts - starts
// ============================================================
async function countBlogPosts() {
    logger.info(`[${FILE_NAME}] Count total blog posts request started`);

    try {
        logger.info(`[${FILE_NAME}] Counting total blog posts`);

        const result = await BlogPost.countDocuments();

        logger.success(`[${FILE_NAME}] Total blog posts counted successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to count total blog posts`, error);
        throw error;
    }
}
// ============================================================
// Count Blog Posts - ends
// ============================================================



// ============================================================
// Find Blog Posts With Pagination - starts
// ============================================================
async function findBlogPostsWithPagination(skip, limit) {
    logger.info(`[${FILE_NAME}] Get blog posts with pagination request started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching blog posts with pagination`);

        const result = await BlogPost.find()
            .skip(skip)
            .limit(limit)
            .select(
                "_id postTitle postDescription postImage postDateTime userID categoryID"
            );

        logger.success(`[${FILE_NAME}] Blog posts with pagination fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch blog posts with pagination`, error);
        throw error;
    }
}
// ============================================================
// Find Blog Posts With Pagination - ends
// ============================================================



// ============================================================
// Find Blog Post By ID - starts
// ============================================================
async function findBlogPostById(postID) {
    logger.info(`[${FILE_NAME}] Get blog post by ID request started`);

    try {
        logger.info(`[${FILE_NAME}] Searching blog post by ID`);

        const result = await BlogPost.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(postID)
                }
            },
            {
                $project: {
                    _id: 1,
                    postTitle: 1,
                    postDescription: 1,
                    postImage: 1,
                    postDateTime: 1,
                    userID: 1,
                    categoryID: 1
                }
            }
        ]);

        if (!result.length) {
            logger.warn(`[${FILE_NAME}] Blog post not found for provided ID`);
        }
        else {
            logger.success(`[${FILE_NAME}] Blog post fetched by ID successfully`);
        }

        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch blog post by ID`, error);
        throw error;
    }
}
// ============================================================
// Find Blog Post By ID - ends
// ============================================================



// ============================================================
// Find Four Blog Posts By Category - starts
// ============================================================
async function findFourBlogPostsByCategory(categoryID) {
    logger.info(`[${FILE_NAME}] Get four blog posts by category request started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching four blog posts by category`);

        const result = await BlogPost.find({
            categoryID: categoryID
        })
        .limit(4)
        .select(
            "_id postTitle postDescription postImage userID categoryID"
        );

        logger.success(`[${FILE_NAME}] Four blog posts by category fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch four blog posts by category`, error);
        throw error;
    }
}
// ============================================================
// Find Four Blog Posts By Category - ends
// ============================================================



// ============================================================
// Find Blog Posts By Category With Pagination - starts
// ============================================================
async function findBlogPostsByCategoryWithPagination(categoryID, skip, limit) {
    logger.info(`[${FILE_NAME}] Get blog posts by category with pagination request started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching blog posts by category with pagination`);

        const result = await BlogPost.find({
            categoryID: categoryID
        })
        .skip(skip)
        .limit(limit)
        .select(
            "_id postTitle postDescription postImage postDateTime userID categoryID"
        );

        logger.success(`[${FILE_NAME}] Blog posts by category fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch blog posts by category`, error);
        throw error;
    }
}
// ============================================================
// Find Blog Posts By Category With Pagination - ends
// ============================================================



// ============================================================
// Count Blog Posts By Category - starts
// ============================================================
async function countBlogPostsByCategory(categoryID) {
    logger.info(`[${FILE_NAME}] Count blog posts by category request started`);

    try {
        logger.info(`[${FILE_NAME}] Counting blog posts by category`);

        const result = await BlogPost.countDocuments({
            categoryID: categoryID
        });

        logger.success(`[${FILE_NAME}] Blog posts by category counted successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to count blog posts by category`, error);
        throw error;
    }
}
// ============================================================
// Count Blog Posts By Category - ends
// ============================================================



// ============================================================
// Find Unique Category IDs - starts
// ============================================================
async function findUniqueCategoryIds() {
    logger.info(`[${FILE_NAME}] Get unique category IDs request started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching unique category IDs`);

        const result = await BlogPost.distinct("categoryID");

        logger.success(`[${FILE_NAME}] Unique category IDs fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch unique category IDs`, error);
        throw error;
    }
}
// ============================================================
// Find Unique Category IDs - ends
// ============================================================



// ============================================================
// Find Unique Users By Category - starts
// ============================================================
async function findUniqueUsersByCategory(categoryID) {
    logger.info(`[${FILE_NAME}] Get unique users by category request started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching unique users by category`);

        const result = await BlogPost.distinct(
            "userID",
            {
                categoryID: categoryID
            }
        );

        logger.success(`[${FILE_NAME}] Unique users by category fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch unique users by category`, error);
        throw error;
    }
}
// ============================================================
// Find Unique Users By Category - ends
// ============================================================



// ============================================================
// Find Blog Posts With Filter Sort Pagination - starts
// ============================================================
async function findBlogPostsWithFilterSortPagination(
    matchStage,
    sortStage,
    skip,
    limit
) {
    logger.info(`[${FILE_NAME}] Filter sort pagination request started`);

    try {
        logger.info(`[${FILE_NAME}] Fetching filtered and sorted blog posts`);

        const result = await BlogPost.aggregate([
            {
                $addFields: {
                    postDescriptionLength: {
                        $strLenCP: "$postDescription"
                    }
                }
            },
            {
                $match: matchStage
            },
            {
                $sort: sortStage
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $project: {
                    _id: 1,
                    postTitle: 1,
                    postDescription: 1,
                    postImage: 1,
                    postDateTime: 1,
                    postDescriptionLength: 1,
                    userID: 1,
                    categoryID: 1
                }
            }
        ]);

        logger.success(`[${FILE_NAME}] Filtered and sorted blog posts fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to fetch filtered blog posts`, error);
        throw error;
    }
}
// ============================================================
// Find Blog Posts With Filter Sort Pagination - ends
// ============================================================



// ============================================================
// Count Blog Posts With Filter - starts
// ============================================================
async function countBlogPostsWithFilter(matchStage) {
    logger.info(`[${FILE_NAME}] Count filtered blog posts request started`);

    try {
        logger.info(`[${FILE_NAME}] Counting filtered blog posts`);

        const result = await BlogPost.aggregate([
            {
                $match: matchStage
            },
            {
                $count: "totalCount"
            }
        ]);

        const totalCount = result[0] ? result[0].totalCount : 0;

        logger.success(`[${FILE_NAME}] Filtered blog posts counted successfully`);
        return totalCount;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to count filtered blog posts`, error);
        throw error;
    }
}
// ============================================================
// Count Blog Posts With Filter - ends
// ============================================================



// ============================================================
// Search Blog Posts By Title Ignore Case - starts
// ============================================================
async function searchBlogPostsByTitleIgnoreCase(postTitle) {
    logger.info(`[${FILE_NAME}] Blog post title search request started`);

    try {
        logger.info(`[${FILE_NAME}] Searching blog posts by title`);

        const result = await BlogPost.find({
            postTitle: {
                $regex: postTitle,
                $options: "i"
            }
        })
        .limit(5)
        .select("_id postTitle");

        logger.success(`[${FILE_NAME}] Blog post title search completed successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to search blog posts by title`, error);
        throw error;
    }
}
// ============================================================
// Search Blog Posts By Title Ignore Case - ends
// ============================================================



// ============================================================
// Repository Exports - starts
// ============================================================
module.exports = {
    createBlogPost,
    deleteBlogPostById,
    updateBlogPostById,
    deleteBlogPostByUserId,
    findUniqueCategoriesByUser,
    findUniqueBlogPostUserIds,
    countBlogPostByUser,
    findBlogPostByUserWithPagination,
    findAllBlogPosts,
    findFourBlogPosts,
    findBlogPostsWithPagination,
    countBlogPosts,
    findBlogPostById,
    findFourBlogPostsByCategory,
    findBlogPostsByCategoryWithPagination,
    countBlogPostsByCategory,
    findUniqueCategoryIds,
    findUniqueUsersByCategory,
    findBlogPostsWithFilterSortPagination,
    countBlogPostsWithFilter,
    searchBlogPostsByTitleIgnoreCase
};
// ============================================================
// Repository Exports - ends
// ============================================================