const express = require("express");

const router = express.Router();

const {
    getAllBlogCategoryList,
    getBlogCategoryById,
    getBlogCategoryByCategoryName,
    searchBlogCategory
} = require("../controllers/blog-category.controller.js");



// ============================================================
// Get all blog categories - starts
// ============================================================
router.get(
    "/categories",
    getAllBlogCategoryList
);
// ============================================================
// Get all blog categories - ends
// ============================================================



// ============================================================
// Get blog category by id - starts
// ============================================================
router.get(
    "/categories/id/:id",
    getBlogCategoryById
);
// ============================================================
// Get blog category by id - ends
// ============================================================



// ============================================================
// Get blog category by category name - starts
// ============================================================
router.get(
    "/categories/name/:categoryName",
    getBlogCategoryByCategoryName
);
// ============================================================
// Get blog category by category name - ends
// ============================================================



// ============================================================
// Search blog category - starts
// ============================================================
router.get(
    "/categories/search",
    searchBlogCategory
);
// ============================================================
// Search blog category - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================