const mongoose = require("mongoose");

const blogPostRepository = require("../repositories/blog-post.repository.js");
const logger = require("../utils/logger.js");

const FILE_NAME = "blog-post-filter-sort.service.js";



// ============================================================
// Get Time Map - starts
// ============================================================
function getTimeMap() {
    logger.info(`[${FILE_NAME}] Creating blog post date filter time map`);
    return {
        "1hour": 60 * 60 * 1000,
        "24hours": 24 * 60 * 60 * 1000,
        "7days": 7 * 24 * 60 * 60 * 1000,
        "1month": 30 * 24 * 60 * 60 * 1000,
        "3months": 90 * 24 * 60 * 60 * 1000,
        "6months": 180 * 24 * 60 * 60 * 1000,
        "1year": 365 * 24 * 60 * 60 * 1000
    };
}
// ============================================================
// Get Time Map - ends
// ============================================================



// ============================================================
// Apply Date Filter - starts
// ============================================================
function applyDateFilter(matchStage, checkedDate) {
    logger.info(`[${FILE_NAME}] Applying blog post date filter`);

    if (checkedDate && checkedDate !== "everyTime") {
        logger.info(`[${FILE_NAME}] Calculating date filter range`);

        const now = new Date();
        const timeAgo = new Date(
            now.getTime() -
            (getTimeMap()[checkedDate] || 0)
        );
        matchStage.postDateTime = {
            $gte: timeAgo
        };

        logger.success(`[${FILE_NAME}] Blog post date filter applied successfully`);
    }
    else {
        logger.info(`[${FILE_NAME}] No specific date filter applied`);
    }
}
// ============================================================
// Apply Date Filter - ends
// ============================================================



// ============================================================
// Get Sort Stage - starts
// ============================================================
function getSortStage(sortSelection) {
    logger.info(`[${FILE_NAME}] Preparing blog post sort stage`);

    if (sortSelection === "postTitleAscending") {
        logger.info(`[${FILE_NAME}] Applying post title ascending sort`);
        return {
            postTitle: 1
        };
    }

    if (sortSelection === "postTitleDescending") {
        logger.info(`[${FILE_NAME}] Applying post title descending sort`);
        return {
            postTitle: -1
        };
    }

    if (sortSelection === "postDateAscending") {
        logger.info(`[${FILE_NAME}] Applying post date ascending sort`);
        return {
            postDateTime: 1
        };
    }

    if (sortSelection === "postDateDescending") {
        logger.info(`[${FILE_NAME}] Applying post date descending sort`);
        return {
            postDateTime: -1
        };
    }

    if (sortSelection === "postLengthAscending") {
        logger.info(`[${FILE_NAME}] Applying post length ascending sort`);
        return {
            postDescriptionLength: 1
        };
    }

    if (sortSelection === "postLengthDescending") {
        logger.info(`[${FILE_NAME}] Applying post length descending sort`);
        return {
            postDescriptionLength: -1
        };
    }

    logger.info(`[${FILE_NAME}] Applying default post date descending sort`);
    return {
        postDateTime: -1
    };
}
// ============================================================
// Get Sort Stage - ends
// ============================================================



// ============================================================
// Get Filtered Blog Posts - starts
// ============================================================
async function getFilteredBlogPosts(data, type) {
    logger.info(`[${FILE_NAME}] Get filtered blog posts request started`);

    try {
        logger.info(`[${FILE_NAME}] Extracting pagination page`);
        const page = parseInt(data.body.page);

        logger.info(`[${FILE_NAME}] Extracting pagination limit`);
        const limit = parseInt(data.body.limit);

        logger.info(`[${FILE_NAME}] Calculating pagination skip value`);
        const skip = (page - 1) * limit;

        logger.info(`[${FILE_NAME}] Preparing blog post match stage`);
        const matchStage = {};

        if (type === "user") {
            logger.info(`[${FILE_NAME}] Applying particular user filter`);
            matchStage.userID =
                new mongoose.Types.ObjectId(
                    data.userID
                );
        }

        if (type === "category") {
            logger.info(`[${FILE_NAME}] Applying particular category filter`);
            matchStage.categoryID =
                new mongoose.Types.ObjectId(
                    data.categoryID
                );
        }

        logger.info(`[${FILE_NAME}] Extracting sort selection`);
        const sortSelection = data.body.sortSelection;

        logger.info(`[${FILE_NAME}] Extracting checked date filter`);
        const checkedDate = data.body.checkedDate;

        applyDateFilter(matchStage, checkedDate);

        if (type !== "category") {
            logger.info(`[${FILE_NAME}] Checking selected category filters`);
            const allCheckedCategory = data.body.allCheckedCategory;
            if (
                Array.isArray(allCheckedCategory) &&
                allCheckedCategory.length > 0
            ) {
                logger.info(`[${FILE_NAME}] Applying selected category filters`);
                matchStage.categoryID = {
                    $in: allCheckedCategory.map(function(id) {
                        return new mongoose.Types.ObjectId(id);
                    })
                };
            }
        }

        if (type !== "user") {
            logger.info(`[${FILE_NAME}] Checking selected author filters`);
            const allCheckedAuthor = data.body.allCheckedAuthor;
            if (
                Array.isArray(allCheckedAuthor) &&
                allCheckedAuthor.length > 0
            ) {
                logger.info(`[${FILE_NAME}] Applying selected author filters`);
                matchStage.userID = {
                    $in: allCheckedAuthor.map(function(id) {
                        return new mongoose.Types.ObjectId(id);
                    })
                };
            }
        }

        logger.info(`[${FILE_NAME}] Preparing blog post sort stage`);
        const sortStage = getSortStage(sortSelection);

        logger.info(`[${FILE_NAME}] Calling blog post repository for filtered blog posts`);
        const blogPostData =
            await blogPostRepository.findBlogPostsWithFilterSortPagination(
                matchStage,
                sortStage,
                skip,
                limit
            );

        logger.info(`[${FILE_NAME}] Filtered blog post repository response received`);

        logger.info(`[${FILE_NAME}] Calling blog post repository to count filtered blog posts`);
        const totalCount = await blogPostRepository.countBlogPostsWithFilter(matchStage);

        logger.info(`[${FILE_NAME}] Filtered blog post count response received`);

        logger.info(`[${FILE_NAME}] Calculating total pages`);
        const totalPages = Math.ceil(totalCount / limit);
        logger.success(`[${FILE_NAME}] Filtered, sorted and paginated blog posts fetched successfully`);

        return {
            currentPage: page,
            totalPages: totalPages,
            totalCount: totalCount,
            blogPostData: blogPostData
        };
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get filtered blog posts`, error);
        throw error;
    }
}
// ============================================================
// Get Filtered Blog Posts - ends
// ============================================================



// ============================================================
// Get Blog Posts With Filter Sort Pagination - starts
// ============================================================
const getBlogPostDetailsWithFilterSortWithPagination = async function(data) {
    logger.info(`[${FILE_NAME}] Get blog posts with filter sort pagination request started`);
    try {
        const result = await getFilteredBlogPosts(data, "all");
        logger.success(`[${FILE_NAME}] Blog posts with filter sort pagination fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get blog posts with filter sort pagination`, error);
        throw error;
    }
};
// ============================================================
// Get Blog Posts With Filter Sort Pagination - ends
// ============================================================



// ============================================================
// Get Blog Posts With Filter Sort Pagination For Particular User - starts
// ============================================================
const getBlogPostDetailsWithFilterSortWithPaginationForParticularUser = async function(data) {
    logger.info(`[${FILE_NAME}] Get blog posts with filter sort pagination for particular user request started`);
    try {
        const result = await getFilteredBlogPosts(data, "user");
        logger.success(`[${FILE_NAME}] Blog posts for particular user with filter sort pagination fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get blog posts for particular user with filter sort pagination`, error);
        throw error;
    }
};
// ============================================================
// Get Blog Posts With Filter Sort Pagination For Particular User - ends
// ============================================================



// ============================================================
// Get Blog Posts With Filter Sort Pagination For Particular Category - starts
// ============================================================
const getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory = async function(data) {
    logger.info(`[${FILE_NAME}] Get blog posts with filter sort pagination for particular category request started`);
    try {
        const result = await getFilteredBlogPosts(data, "category");
        logger.success(`[${FILE_NAME}] Blog posts for particular category with filter sort pagination fetched successfully`);
        return result;
    }
    catch(error) {
        logger.error(`[${FILE_NAME}] Failed to get blog posts for particular category with filter sort pagination`, error);
        throw error;
    }
};
// ============================================================
// Get Blog Posts With Filter Sort Pagination For Particular Category - ends
// ============================================================



// ============================================================
// Service Exports - starts
// ============================================================
module.exports = {
    getBlogPostDetailsWithFilterSortWithPagination,
    getBlogPostDetailsWithFilterSortWithPaginationForParticularUser,
    getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory
};
// ============================================================
// Service Exports - ends
// ============================================================