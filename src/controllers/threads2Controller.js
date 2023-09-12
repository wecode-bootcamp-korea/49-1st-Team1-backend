const threads2Service = require('../services/threads2Service');

// 쓰레드 목록 보기(최신순 정렬)
const threadsList = async (req, res) => {
    try {
        const threadsData = await threads2Service.threadsList();
        
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