const express = require("express");

const {
    updateUserProfilePhoto,
    updateUserBasicInformation,
    updateUserEmailUsername,
    updateUserPassword
} = require("../controllers/blog-user.controller.js");

const router = express.Router();



// ============================================================
// Update user profile photo - starts
// ============================================================
router.put(
    "/update/profilePhoto/:userID",
    updateUserProfilePhoto
);
// ============================================================
// Update user profile photo - ends
// ============================================================



// ============================================================
// Update user basic information - starts
// ============================================================
router.put(
    "/update/basicInfo/:userID",
    updateUserBasicInformation
);
// ============================================================
// Update user basic information - ends
// ============================================================



// ============================================================
// Update user username and email - starts
// ============================================================
router.put(
    "/update/usernameEmail/:userID",
    updateUserEmailUsername
);
// ============================================================
// Update user username and email - ends
// ============================================================



// ============================================================
// Update user password - starts
// ============================================================
router.put(
    "/update/password/:userID",
    updateUserPassword
);
// ============================================================
// Update user password - ends
// ============================================================



// ============================================================
// Router Export - starts
// ============================================================
module.exports = router;
// ============================================================
// Router Export - ends
// ============================================================