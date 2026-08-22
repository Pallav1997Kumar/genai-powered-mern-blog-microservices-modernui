const express = require("express");

const router = express.Router();

const {
    getFourBlogPostForParticularCategory,
    getBlogPostForParticularCategoryWithPagination,
    getBlogPostedUniqueCategoryIds,
    getBlogPostedUniqueUsersForParticularCategory
} = require("../controllers/blog-post-category.controller.js");



// ============================================================
// Get four blog posts for particular category - starts
// ============================================================
router.get(
    "/four-blog-post/:categoryID",
    getFourBlogPostForParticularCategory
);
// ============================================================
// Get four blog posts for particular category - ends
// ============================================================



// ============================================================
// Get blog posts for particular category with pagination - starts
// ============================================================
router.get(
    "/pagination/:categoryID",
    getBlogPostForParticularCategoryWithPagination
);
// ============================================================
// Get blog posts for particular category with pagination - ends
// ============================================================



// ============================================================
// Get blog posted unique category IDs - starts
// ============================================================
router.get(
    "/unique-category-ids",
    getBlogPostedUniqueCategoryIds
);
// ============================================================
// Get blog posted unique category IDs - ends
// ============================================================



// ============================================================
// Get blog posted unique users for particular category - starts
// ============================================================
router.get(
    "/unique-users/:categoryID",
    getBlogPostedUniqueUsersForParticularCategory
);
// ============================================================
// Get blog posted unique users for particular category - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================