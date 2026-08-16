const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDatabase } = require("./config/database.config.js");

const blogCategoryRoute = require("./routes/blog-category.route.js");


const app = express();


// Middleware
app.use(cors({
    origin:true,
    credentials:true
}));


app.use(express.json());
app.use(cookieParser());



// Routes
app.use("/api", blogCategoryRoute);


// Database Connection
connectDatabase();


// Start Server

const port = process.env.PORT || 4005;

app.listen(port, function(){
    console.log(`Blogpost Category Service running on port ${port}`);
});