const express = require("express");

const router = express.Router();

const {
    getBlogPostForParticularUserWithPagination,
    getBlogPostedUniqueUserIds,
    getBlogPostedUniqueCategoriesForParticularUser
} = require("../controllers/blog-post-user.controller.js");



// ============================================================
// Get blog posts for particular user with pagination - starts
// ============================================================
router.get(
    "/pagination/userId/:userID",
    getBlogPostForParticularUserWithPagination
);
// ============================================================
// Get blog posts for particular user with pagination - ends
// ============================================================



// ============================================================
// Get blog posted unique user IDs - starts
// ============================================================
router.get(
    "/unique-user-ids",
    getBlogPostedUniqueUserIds
);
// ============================================================
// Get blog posted unique user IDs - ends
// ============================================================



// ============================================================
// Get blog posted unique categories for particular user - starts
// ============================================================
router.get(
    "/unique-categories/userId/:userID",
    getBlogPostedUniqueCategoriesForParticularUser
);
// ============================================================
// Get blog posted unique categories for particular user - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================