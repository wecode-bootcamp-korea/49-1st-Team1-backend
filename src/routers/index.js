const express = require("express");
const userRouter = require("./userRouter");
const router = express.Router();
const threadsRouter = require("./threadUserRouter")

router.use("/users", userRouter.router);
router.use("/threads", threadsRouter.router);

module.exports = router;
