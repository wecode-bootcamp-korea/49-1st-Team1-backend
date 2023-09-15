const express = require("express");
const { likeController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");
const router = express.Router();

router.post("/", validateToken, asyncWrap(likeController.pushLike));

module.exports = { router };
