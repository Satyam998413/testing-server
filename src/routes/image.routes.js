const express = require("express");
const { generateImage ,getData} = require("../controllers/image.controller");

const router = express.Router();

router.post("/generate", generateImage);
router.get("/get-data", getData);

module.exports = router;
