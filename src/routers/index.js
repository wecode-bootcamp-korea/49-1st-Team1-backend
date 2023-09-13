const express = require("express");
const userRouter = require("./userRouter");
const threads2Router = require("./threads2Router");
const threadsRouter = require("./threadUserRouter");
const likeRouter = require("./likeRouter");
const router = express.Router();

router.use("/users", userRouter.router);
router.use("/threads2", threads2Router.router);
router.use("/threads", threadsRouter.router);
router.use("/likes", likeRouter.router);

module.exports = router;
