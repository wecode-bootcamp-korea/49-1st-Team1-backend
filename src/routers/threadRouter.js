const express = require("express");
const { threadController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const router = express.Router();
const validateToken = require("../utils/validateToken");

router.post("/writeThread", validateToken, asyncWrap(threadController.writeThread));
router.post("/deleteThread", validateToken, asyncWrap(threadController.deleteThread));
router.get("/", asyncWrap(threadController.threadsList));
router.put("/modify/:threadId", validateToken, asyncWrap(threadController.modifyThreads));

module.exports = { router };