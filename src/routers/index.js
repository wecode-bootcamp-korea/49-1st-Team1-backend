const express = require("express");
const userRouter = require("./userRouter");
const threads2Router = require("./threads2Router")
const router = express.Router();
const threadsRouter = require("./threadUserRouter")

router.use("/users", userRouter.router);
router.use("/threads2", threads2Router.router);
router.use("/threads", threadsRouter.router);

module.exports = router;
