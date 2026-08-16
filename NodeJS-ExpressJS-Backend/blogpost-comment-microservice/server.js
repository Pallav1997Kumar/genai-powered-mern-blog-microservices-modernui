const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDatabase } = require("./config/database.config.js");

const blogPostCommentRoute = require("./routes/blog-comment.routes.js");


const app = express();


// Middleware
app.use(cors({
    origin:true,
    credentials:true
}));


app.use(express.json());
app.use(cookieParser());



// Routes
app.use("/api/blog-comment", blogPostCommentRoute);


// Database Connection
connectDatabase();


// Start Server

const port = process.env.PORT || 4004;

app.listen(port, function(){
    console.log(`Blogpost Comment Service running on port ${port}`);
});