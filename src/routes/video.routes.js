const express = require("express");
const { generateVideo } = require("../controllers/video.controller");

const router = express.Router();

router.post("/generate", generateVideo);

module.exports = router;
