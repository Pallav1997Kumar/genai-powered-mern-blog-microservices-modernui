const express = require("express");

const {
    searchUserOrCategoryOrBlog
} = require("../controllers/search-user-category-blog.controller.js");

const router = express.Router();



// ============================================================
// Search user, category or blog - starts
// ============================================================
router.get(
    "",
    searchUserOrCategoryOrBlog
);
// ============================================================
// Search user, category or blog - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
module.exports = router;
// ============================================================