const express = require("express");

const { searchUserOrCategoryOrBlog } = require("../controllers/search-user-category-blog.controller.js");


const router = express.Router();


router.get("", searchUserOrCategoryOrBlog);


module.exports = router;