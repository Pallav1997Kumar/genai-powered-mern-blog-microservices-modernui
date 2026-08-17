const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDatabase } = require("./config/database.config.js");

const blogPostLikeRoute = require("./routes/blog-post-like.routes.js");


const app = express();


// Middleware
app.use(cors({
    origin:true,
    credentials:true
}));


app.use(express.json());
app.use(cookieParser());



// Routes
app.use("/api/blog-like", blogPostLikeRoute);


// Database Connection
connectDatabase();


// Start Server

const port = process.env.PORT || 4003;

app.listen(port, function(){
    console.log(`Blogpost Like Service running on port ${port}`);
});