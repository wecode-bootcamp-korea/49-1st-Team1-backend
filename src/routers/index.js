const express = require("express");
const userRouter = require("./userRouter");
const threads2Router = require("./threads2Router")
const router = express.Router();

router.use("/users", userRouter.router);
router.use("/threads", threads2Router.router)

module.exports = router;
