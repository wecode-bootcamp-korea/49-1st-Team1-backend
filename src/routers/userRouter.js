const express = require("express");
const { userController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const router = express.Router();

router.post("/", asyncWrap(userController.signUp));
router.post("/login", asyncWrap(userController.signIn));

module.exports = { router };
