const userDao = require("./dana_dao");


const threadToWrite = (newThreadContent) => {

  //error handling - content가 1글자 이상이어야 한다
  if (newThreadContent.length < 2) {
    const error = new Error("CONTENT_TOO_SHORT");
    error.status = 400;

    throw error;
  }

  userDao.insertThread(newThreadContent)

};


const threadToDelete = (threadId, userId) => {

  //  Error handling - 존재하지 않는 쓰레드를 삭제하는 경우
  const existingThread = userDao.findThread(threadId);

  if (existingThread.length === 0) {
    const error = new Error("CONTENT_NOT_FOUND");
    error.status = 400;

    throw error;
  }

  //  Error handling - 다른 유저가 쓴 쓰레드를 삭제하는 경우
  const thisUserThread = userDao.findUser(userId);

    if (!thisUserThread.includes(content)) {
      const error = new Error("NOT_YOUR_THREAD");
      error.status = 400;
  
      throw error;
    }

    //return ???
    
  }

module.exports = {threadToWrite, threadToDelete}



