const express = require("express");
const userRouter = require("./userRouter");
const threadsRouter = require("./threads2Router")
const router = express.Router();

router.use("/users", userRouter.router);
router.use("/threads", threadsRouter.router)

module.exports = router;
