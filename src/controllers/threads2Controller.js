const threads2Service = require('../services/threads2Service');

// 쓰레드 목록 보기
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

  //자신의 쓰레드 수정하기
  const modifyThreads = async (req, res) => {
    try {
       const { id } = req.params;
       const { content } = req.body;
       const { foundUser } = req;

       await threads2Service.modifyThreads(foundUser, id, content)
       res.status(200).json({message : "update success" })
    
    } catch (err) {
        console.error(err);
    }
  }

  module.exports = {
    threadsList,
    modifyThreads
  }