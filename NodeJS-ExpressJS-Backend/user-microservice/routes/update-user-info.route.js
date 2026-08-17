const express = require("express");
const router = express.Router();

const {
    updateUserProfilePhoto, 
    updateUserBasicInformation, 
    updateUserEmailUsername, 
    updateUserPassword
} = require("../controllers/user-update.controller.js");


router.put("/profile-photo/:userID", updateUserProfilePhoto);
router.put("/basic-information/:userID", updateUserBasicInformation);
router.put("/email-username/:userID", updateUserEmailUsername);
router.put("/password/:userID", updateUserPassword);


module.exports = router;