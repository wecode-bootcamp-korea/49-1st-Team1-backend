const userDao = require("../models/thread_dao");


const threadWrite = async (newThreadUser, newThreadContent) => {

  //error handling - content가 1글자 이상이어야 한다
  if (newThreadContent.length < 2) {
    const error = new Error("CONTENT_TOO_SHORT");
    error.status = 400;

    throw error;
  }

  await userDao.insertThread(newThreadUser, newThreadContent)

};


const threadDelete = async (threadId, userId) => {

  //  Error handling - 존재하지 않는 쓰레드를 삭제하는 경우
  const existingThread = await userDao.findThread(threadId);
  console.log(existingThread)
  if (existingThread.length == 0) {
    const err = new Error("CONTENT_NOT_FOUND");
    err.status = 400;

    throw err;
  }

  //  Error handling - 다른 유저가 쓴 쓰레드를 삭제하는 경우
  const thisUserThread = await userDao.findThreadUser(userId);
  console.log(thisUserThread)
    if (existingThread.length > 0 && thisUserThread.length == 0) {
      const err = new Error("NOT_YOUR_THREAD");
      err.status = 400;
  
      throw err;
    }
    
    await userDao.deleteThread(threadId, userId)

  };

module.exports = {threadWrite, threadDelete}



