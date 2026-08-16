const express = require("express");
const router = express.Router();

const {
    addNewBlogComment,
    updateParticularComment,
    deleteParticularComment,
    getAllCommentsForParticularBlog,
    deleteAllCommentsByUserId,
    deleteAllCommentsByPostId
} = require("../controllers/blog-comment.controller");


router.post("/post/:postID", addNewBlogComment);
router.put("/comment/:commentID", updateParticularComment);
router.delete("/comment/:commentID", deleteParticularComment);
router.get("/post/:postID", getAllCommentsForParticularBlog);
router.delete("/user/:userID", deleteAllCommentsByUserId);
router.delete("/post/:postID", deleteAllCommentsByPostId);


module.exports = router;