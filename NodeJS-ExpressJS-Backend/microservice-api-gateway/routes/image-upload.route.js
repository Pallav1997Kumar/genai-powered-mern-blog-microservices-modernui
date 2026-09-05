const express = require("express");
const imageServiceProxy = require("../proxies/image-service.proxy.js");

const router = express.Router();

router.post("/blogImage", imageServiceProxy);
router.post("/profilePhoto", imageServiceProxy);

module.exports = router;