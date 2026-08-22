const express = require("express");

const {
    addNewBlogPost,
    deleteParticularBlogPost,
    updateParticularBlogPost,
    getAllBlogPostWithUserAndCategoryInfo,
    getFourBlogPostWithUserAndCategoryInfo,
    getFourBlogPostWithUserAndCategoryInfoForParticularCategory,
    getParticularBlogPostWithUserAndCategoryInfo,
    getBlogPostWithUserAndCategoryInfoWithPagination,
    getBlogPostWithUserAndCategoryInfoForParticularCategoryWithPagination,
    getBlogPostWithUserAndCategoryForParticularUserInfoWithPagination,
    getBlogPostedUniqueUsersDetails,
    getBlogPostedUniqueUsersDetailsForParticularCategory,
    getBlogPostedUniqueCategoriesDetails,
    getBlogPostedUniqueCategoriesDetailsForParticularUser,
    getBlogPostDetailsWithFilterSortWithPagination,
    getBlogPostDetailsWithFilterSortWithPaginationForParticularUser,
    getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory
} = require("../controllers/blog-post.controller.js");

const router = express.Router();



// ============================================================
// Get particular blog post with user and category info - starts
// ============================================================
router.get(
    "/postId/:postID",
    getParticularBlogPostWithUserAndCategoryInfo
);
// ============================================================
// Get particular blog post with user and category info - ends
// ============================================================



// ============================================================
// Add new blog post - starts
// ============================================================
router.post(
    "/newPost/post",
    addNewBlogPost
);
// ============================================================
// Add new blog post - ends
// ============================================================



// ============================================================
// Delete particular blog post - starts
// ============================================================
router.delete(
    "/deletePost/:postID",
    deleteParticularBlogPost
);
// ============================================================
// Delete particular blog post - ends
// ============================================================



// ============================================================
// Update particular blog post - starts
// ============================================================
router.put(
    "/updatePost/:postID",
    updateParticularBlogPost
);
// ============================================================
// Update particular blog post - ends
// ============================================================



// ============================================================
// Get all blog posts with user and category info - starts
// ============================================================
router.get(
    "/postWithUserAndCategoryInfo",
    getAllBlogPostWithUserAndCategoryInfo
);
// ============================================================
// Get all blog posts with user and category info - ends
// ============================================================



// ============================================================
// Get four blog posts with user and category info - starts
// ============================================================
router.get(
    "/fourPostWithUserAndCategoryInfo",
    getFourBlogPostWithUserAndCategoryInfo
);
// ============================================================
// Get four blog posts with user and category info - ends
// ============================================================



// ============================================================
// Get four blog posts with user and category info for particular category - starts
// ============================================================
router.get(
    "/fourPostWithUserAndCategoryInfo/:categoryID",
    getFourBlogPostWithUserAndCategoryInfoForParticularCategory
);
// ============================================================
// Get four blog posts with user and category info for particular category - ends
// ============================================================



// ============================================================
// Get blog posts with user and category info with pagination - starts
// ============================================================
router.get(
    "/postWithPaginationWithUserAndCategoryInfo",
    getBlogPostWithUserAndCategoryInfoWithPagination
);
// ============================================================
// Get blog posts with user and category info with pagination - ends
// ============================================================



// ============================================================
// Get blog posts with user and category info for particular category with pagination - starts
// ============================================================
router.get(
    "/postWithPaginationWithUserAndCategoryInfo/category/:categoryName",
    getBlogPostWithUserAndCategoryInfoForParticularCategoryWithPagination
);
// ============================================================
// Get blog posts with user and category info for particular category with pagination - ends
// ============================================================



// ============================================================
// Get blog posts with user and category info for particular user with pagination - starts
// ============================================================
router.get(
    "/postWithPaginationWithUserAndCategoryInfo/user/:username",
    getBlogPostWithUserAndCategoryForParticularUserInfoWithPagination
);
// ============================================================
// Get blog posts with user and category info for particular user with pagination - ends
// ============================================================



// ============================================================
// Get distinct blog users details - starts
// ============================================================
router.get(
    "/distinctBlogUsersInfo",
    getBlogPostedUniqueUsersDetails
);
// ============================================================
// Get distinct blog users details - ends
// ============================================================



// ============================================================
// Get distinct blog users details for particular category - starts
// ============================================================
router.get(
    "/distinctBlogUsersInfo/:categoryName",
    getBlogPostedUniqueUsersDetailsForParticularCategory
);
// ============================================================
// Get distinct blog users details for particular category - ends
// ============================================================



// ============================================================
// Get distinct blog categories details - starts
// ============================================================
router.get(
    "/distinctBlogCategoriesInfo",
    getBlogPostedUniqueCategoriesDetails
);
// ============================================================
// Get distinct blog categories details - ends
// ============================================================



// ============================================================
// Get distinct blog categories details for particular user - starts
// ============================================================
router.get(
    "/distinctBlogCategoriesInfo/:username",
    getBlogPostedUniqueCategoriesDetailsForParticularUser
);
// ============================================================
// Get distinct blog categories details for particular user - ends
// ============================================================



// ============================================================
// Get blog post details with filter sort and pagination - starts
// ============================================================
router.post(
    "/postWithFilterSortingPaginationWithUserAndCategoryInfo",
    getBlogPostDetailsWithFilterSortWithPagination
);
// ============================================================
// Get blog post details with filter sort and pagination - ends
// ============================================================



// ============================================================
// Get blog post details with filter sort and pagination for particular user - starts
// ============================================================
router.post(
    "/postWithFilterSortingPaginationWithUserAndCategoryInfo/user/:username",
    getBlogPostDetailsWithFilterSortWithPaginationForParticularUser
);
// ============================================================
// Get blog post details with filter sort and pagination for particular user - ends
// ============================================================



// ============================================================
// Get blog post details with filter sort and pagination for particular category - starts
// ============================================================
router.post(
    "/postWithFilterSortingPaginationWithUserAndCategoryInfo/category/:categoryName",
    getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory
);
// ============================================================
// Get blog post details with filter sort and pagination for particular category - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================