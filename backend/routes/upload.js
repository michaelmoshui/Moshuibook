const express = require("express");
const { uploadImages } = require("../controllers/upload");
const { authUser } = require("../middleware/auth");
const imageUpload = require("../middleware/imageUpload");

const router = express.Router();

router.post("/uploadImages", imageUpload, authUser, uploadImages);

module.exports = router;
