const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const threads = require ('./dana/thread.js')



app.get("/ping", async (req, res) => {
  try {
    res.status(200).json({
      message: "pong"
    });
  } catch (error) {
    console.error(error);
  }
});

app.post ('/newThread', threads.thread_write) 
app.delete('/deleteThread', threads.thread_delete)

const start = async () => {
  try {
    app.listen (process.env.SERVER_PORT, () => console.log("server is listening in PORT 8000"));
  } catch (error) {
    console.error(error);
  }
};

start();
