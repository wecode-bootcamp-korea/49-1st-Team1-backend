const express = require("express");
const threads2Controller = require("../controllers/threads2Controller");
const { asyncWrap } = require("../utils/errorHandler");

const router = express.Router();

router.get("/", asyncWrap(threads2Controller.threadsList));

module.exports = { router };
