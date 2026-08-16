const express = require("express");
const { 
    blogUserRegistration, 
    blogUserLogin, 
    blogUserAccountDelete, 
    blogUserLogout 
} = require("../controllers/authorization.controller");

const router = express.Router();


router.post("/register", blogUserRegistration);
router.post("/login", blogUserLogin);
router.delete("/deleteAccount/:userID", blogUserAccountDelete);
router.post("/logout", blogUserLogout);


module.exports = router;