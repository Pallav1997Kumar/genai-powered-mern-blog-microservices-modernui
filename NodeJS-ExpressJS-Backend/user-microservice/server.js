const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDatabase } = require("./config/database.config.js");

const authorizationRoute = require("./routes/auth.route.js");
const userRoute = require("./routes/user.route.js")
const updateUserInfoRoute = require("./routes/update-user-info.route.js");


const app = express();


// Middleware
app.use(cors({
    origin:true,
    credentials:true
}));


app.use(express.json());
app.use(cookieParser());



// Routes
app.use("/api/users", authorizationRoute);
app.use("/api/users", userRoute);
app.use("/api/users/update", updateUserInfoRoute);


// Database Connection
connectDatabase();


// Start Server

const port = process.env.PORT || 4001;

app.listen(port, function(){
    console.log(`User Service running on port ${port}`);
});