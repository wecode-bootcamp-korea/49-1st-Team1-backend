const express = require("express");
const threadController = require("../controllers/thread_controller");
const { asyncWrap } = require("../utils/errorHandler");
const router = express.Router();
const validateToken = require("../utils/validateToken")

router.post("/writeThread", validateToken, asyncWrap(threadController.writeThread));
// router.post("/writeThread", asyncWrap(threadController.writeThread));

router.post("/deleteThread", validateToken, asyncWrap(threadController.deleteThread));


module.exports = { router };