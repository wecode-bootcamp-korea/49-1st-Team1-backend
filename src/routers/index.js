const express = require("express");
const userRouter = require("./userRouter");
const threadRouter = require("./threadRouter");
const likeRouter = require("./likeRouter");
const router = express.Router();

router.use("/users", userRouter.router);
router.use("/threads", threadRouter.router);
router.use("/likes", likeRouter.router);

module.exports = router;
