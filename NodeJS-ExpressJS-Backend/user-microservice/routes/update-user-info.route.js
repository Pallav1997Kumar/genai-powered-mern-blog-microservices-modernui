const express = require("express");

const router = express.Router();

const {
    updateUserProfilePhoto,
    updateUserBasicInformation,
    updateUserEmailUsername,
    updateUserPassword
} = require("../controllers/user-update.controller.js");



// ============================================================
// Update user profile photo - starts
// ============================================================
router.put(
    "/profile-photo/:userID",
    updateUserProfilePhoto
);
// ============================================================
// Update user profile photo - ends
// ============================================================



// ============================================================
// Update user basic information - starts
// ============================================================
router.put(
    "/basic-information/:userID",
    updateUserBasicInformation
);
// ============================================================
// Update user basic information - ends
// ============================================================



// ============================================================
// Update user email and username - starts
// ============================================================
router.put(
    "/email-username/:userID",
    updateUserEmailUsername
);
// ============================================================
// Update user email and username - ends
// ============================================================



// ============================================================
// Update user password - starts
// ============================================================
router.put(
    "/password/:userID",
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