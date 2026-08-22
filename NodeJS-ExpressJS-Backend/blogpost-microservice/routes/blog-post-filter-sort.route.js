const express = require("express");

const router = express.Router();

const {
    getBlogPostDetailsWithFilterSortWithPagination,
    getBlogPostDetailsWithFilterSortWithPaginationForParticularUser,
    getBlogPostDetailsWithFilterSortWithPaginationForParticularCategory
} = require("../controllers/blog-post-filter-sort.controller.js");



// ============================================================
// Get blog post details with filter sort and pagination - starts
// ============================================================
router.post(
    "/filter-sort-pagination",
    getBlogPostDetailsWithFilterSortWithPagination
);
// ============================================================
// Get blog post details with filter sort and pagination - ends
// ============================================================



// ============================================================
// Get blog post details with filter sort and pagination for particular user - starts
// ============================================================
router.post(
    "/filter-sort-pagination/user/:userID",
    getBlogPostDetailsWithFilterSortWithPaginationForParticularUser
);
// ============================================================
// Get blog post details with filter sort and pagination for particular user - ends
// ============================================================



// ============================================================
// Get blog post details with filter sort and pagination for particular category - starts
// ============================================================
router.post(
    "/filter-sort-pagination/category/:categoryID",
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