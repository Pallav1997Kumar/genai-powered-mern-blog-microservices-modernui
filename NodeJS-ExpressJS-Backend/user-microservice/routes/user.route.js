const express = require("express");
const router = express.Router();

const {
    getUserById,
    getUserByUsername,
    deleteUserById,
    searchBlogUserByName 
} = require("../controllers/user.controller.js");


router.get("/id/:id", getUserById);
router.get("/username/:username", getUserByUsername);
router.delete("/id/:id", deleteUserById);
router.post("/search", searchBlogUserByName);


module.exports = router;