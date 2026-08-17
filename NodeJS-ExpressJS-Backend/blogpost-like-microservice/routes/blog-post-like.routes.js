const express = require("express");
const router = express.Router();

const {
    blogPostLike,
    blogPostUnlike,
    getAllLikesForParticularBlog,
    deleteAllLikesByUserId,
    deleteAllLikesByPostId
} = require("../controllers/blog-post-like.controller");


router.post("/post/:postID", blogPostLike);
router.delete("/post/:postID", blogPostUnlike);
router.get("/post/:postID", getAllLikesForParticularBlog);
router.delete("/user/:userID",deleteAllLikesByUserId);
router.delete("/post/:postID/all",deleteAllLikesByPostId);


module.exports = router;