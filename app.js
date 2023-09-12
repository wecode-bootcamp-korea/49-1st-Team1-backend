const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { myDataSource } = require("./src/models/dataSource");
const routers = require("./src/routers");
const { errorHandler } = require("./src/utils/errorHandler");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(routers);

app.use(errorHandler);

app.get("/ping", async (req, res) => {
  try {
    res.status(200).json({
      message: "pong",
    });
  } catch (error) {
    console.error(error);
  }
});

const start = async () => {
  try {
    await myDataSource.initialize().then(() => console.log("Data Source has been initialized!"));

    const port = process.env.SERVER_PORT;
    app.listen(port, () => console.log(`server is listening in PORT ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start();