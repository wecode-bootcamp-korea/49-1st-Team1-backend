const express = require("express");
const threads2Controller = require("../controllers/threads2Controller");
const validateToken = require("../utils/validateToken")
const { asyncWrap } = require("../utils/errorHandler");

const router = express.Router();

router.get("/", asyncWrap(threads2Controller.threadsList));
router.put("/modify/:id", validateToken, asyncWrap(threads2Controller.modifyThreads))

module.exports = { router };
