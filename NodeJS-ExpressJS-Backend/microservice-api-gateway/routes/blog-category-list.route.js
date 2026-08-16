const express = require("express");
const { getAllBlogCategoryList } = require("../controllers/blog-category-list.controller.js");


const router = express.Router();


router.get("/", getAllBlogCategoryList);


module.exports = router;