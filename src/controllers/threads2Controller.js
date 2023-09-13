const threads2Service = require('../services/threads2Service');

// 쓰레드 목록 보기
const threadsList = async (req, res) => {
    try {
        const threadsData = await threads2Service.threadsList();
        
        return res.status(201).json({
            message : "READ_SUCCESS",
            "data" : threadsData
        })
    } catch (err) {
        console.log(err)
        res.status(err.status || 500).json({ message : err.message })
    }
  }

  // 쓰레드 수정하기
  const modifyThreads = async (req, res) => {
    try {
       const { id } = req.params; // URL 경로에서 매개 변수 추출 (/modify/:id)
       const { content } = req.body; // 요청 본문에서 내용 추출
       const { foundUser } = req; // 이전 미들웨어에서 설정한 사용자 정보 추출 (validateToken 미들웨어에서 설정한 foundUser)

       const result = await threads2Service.modifyThreads(foundUser, id, content)

       res.status(200).json({ message : result.message })
    
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message : err.message })
    }
  }

  module.exports = {
    threadsList,
    modifyThreads
  }