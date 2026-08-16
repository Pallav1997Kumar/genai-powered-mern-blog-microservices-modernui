// Import Dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import Routes
const authorizationRoute = require("./routes/authorization.route.js");
const blogUserRoute = require("./routes/blog-user.route.js");
const blogPostRoute = require("./routes/blog-post.route.js");
const blogPostCommentRoute = require("./routes/blog-post-comment.route.js");
const blogPostLikeRoute = require("./routes/blog-post-like.route.js");
const blogCategoryListRoute = require("./routes/blog-category-list.route.js");
const searchUserCategoryBlogRoute = require("./routes/search-user-category-blog.route.js");
//const imageUploadRoute = require("./routes/image-upload.route.js");
//const generativeAIRoute = require("./routes/generative-AI.route.js");



// 🔧 Initialize Express App
const app = express();


// Environment Variables
dotenv.config({path: "./config.env"});


// CORS Configuration
let corsOption;

if(process.env.environment == "DEVELOPMENT"){
    corsOption = {
        origin : "http://localhost:3000",
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
}
else if(process.env.environment == "PRODUCTION"){
    corsOption = {
        origin : process.env.frontEndHost,
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
}

app.use(cors(corsOption));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/authorization/", authorizationRoute);

app.use("/api/blogUser/", blogUserRoute);

app.use("/api/blogPost/", blogPostRoute);

app.use("/api/blogPost/comment/", blogPostCommentRoute);

app.use("/api/blogPost/blogPostLike/", blogPostLikeRoute);

app.use("/api/blog/categoryList/", blogCategoryListRoute);

app.use("/api/searchBlogOrUserOrCategory/", searchUserCategoryBlogRoute);

//app.use("/api/imageUpload/", imageServiceProxy);

//app.use("/api/generativeAI/", generativeAIRoute);


// Start Server
const port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log(`Connected to backend in ${port}`);
});
