const express = require("express");
const router = express.Router();

const {
    getAllBlogCategoryList,
    getBlogCategoryById,
    getBlogCategoryByCategoryName,
    searchBlogCategory
} = require("../controllers/blog-category.controller");


router.get("/categories",getAllBlogCategoryList);
router.get("/categories/id/:id", getBlogCategoryById);
router.get("/categories/name/:categoryName", getBlogCategoryByCategoryName);
router.get("/categories/search", searchBlogCategory);


module.exports = router;