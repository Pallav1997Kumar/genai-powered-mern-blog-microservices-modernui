const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDatabase } = require("./config/database.config.js");

const blogPostCategoryRoute = require("./routes/blog-post-category.route.js");
const blogPostFilterSortRoute = require("./routes/blog-post-filter-sort.route.js");
const blogPostReadRoute = require("./routes/blog-post-read.route.js");
const blogPostUserRoute = require("./routes/blog-post-user.route.js");
const blogPostWriteRoute = require("./routes/blog-post-write.route.js");


const app = express();


// Middleware
app.use(cors({
    origin:true,
    credentials:true
}));


app.use(express.json());
app.use(cookieParser());



// Routes
app.use("/api/blog-post/category", blogPostCategoryRoute);
app.use("/api/blog-post/filter-sort", blogPostFilterSortRoute);
app.use("/api/blog-post/read", blogPostReadRoute);
app.use("/api/blog-post/user", blogPostUserRoute);
app.use("/api/blog-post/write", blogPostWriteRoute);


// Database Connection
connectDatabase();


// Start Server

const port = process.env.PORT || 4002;

app.listen(port, function(){
    console.log(`User Service running on port ${port}`);
});