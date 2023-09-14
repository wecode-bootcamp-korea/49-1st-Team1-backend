const express = require("express");
const { userRouter } = require("./userRouter");
const threadRouter = require("./threadRouter");
const likeRouter = require("./likeRouter");
const router = express.Router();

console.log(userRouter)

router.use("/users", userRouter);
router.use("/threads", threadRouter.router);
router.use("/likes", likeRouter.router);

module.exports = router;
