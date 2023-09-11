const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const threadsService2 = require('./heywoo/threadsService2.js')

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

/*app.get("/ping", async (req, res) => {
  try {
    res.status(200).json({
      message: "pong",
    });
  } catch (error) {
    console.error(error);
  }
});*/

app.get("/threads/getList", threadsService2.threadsList)

const start = async () => {
  try {
    app.listen(process.env.SERVER_PORT, () => console.log("server is listening in PORT 8000"));
  } catch (error) {
    console.error(error);
  }
};

start();
