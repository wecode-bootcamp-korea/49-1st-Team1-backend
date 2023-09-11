const jwt = require('jsonwebtoken');
const { DataSource } = require('typeorm');
const dotenv = require('dotenv')

dotenv.config()

const myDataSource = new DataSource({
    type: process.env.DB_CONNECTION ,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  })

  /*
  myDataSource.initialize()
  .then(() => {
    console.log("데이터 연결 성공")
  })*/

  const threadsList = async (req, res) => {
    try {
        const threadsData = await myDataSource.query (`SELECT * FROM threads`)
        console.log("threadsData : ", threadsData)
        return res.status(201).json({
            "data" : threadsData
        })
    } catch (err) {
        console.log(err)
    }
  }

  module.exports = {
    "threadsList" : threadsList
  }