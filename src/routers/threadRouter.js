const express = require("express");
const { threadController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const router = express.Router();
const { validateToken, tokenParser } = require("../utils/validateToken");

router.post("/", validateToken, asyncWrap(threadController.writeThread));
router.delete("/:id", validateToken, asyncWrap(threadController.deleteThread));
router.get("/", tokenParser, asyncWrap(threadController.threadsList));
router.get("/:threadId",validateToken, asyncWrap(threadController.threadsDetail))
router.put("/:threadId", validateToken, asyncWrap(threadController.modifyThreads));

module.exports = { router };
