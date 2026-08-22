const express = require("express");

const {
    getAllBlogCategoryList
} = require("../controllers/blog-category-list.controller.js");

const router = express.Router();



// ============================================================
// Get all blog category list - starts
// ============================================================
router.get(
    "/",
    getAllBlogCategoryList
);
// ============================================================
// Get all blog category list - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================