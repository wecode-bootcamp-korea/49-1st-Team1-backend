const { threadDao } = require("../models");

const threadWrite = async (newThreadUser, newThreadContent) => {
  //error handling - content가 1글자 이상이어야 한다
  if (newThreadContent.length < 2) {
    const error = new Error("CONTENT_TOO_SHORT");
    error.status = 400;

    throw error;
  }

  await threadDao.insertThread(newThreadUser, newThreadContent);
};

const threadsList = async (userId) => {
  const threadsListData = await threadDao.threadsList();

  threadsListData.forEach((thread) => {
    thread.isMyPost = thread.userId === userId;
  });

  return threadsListData;
};

const modifyThreads = async (foundUser, threadId, content) => {
  const [thread] = await threadDao.findThreadById(threadId);

  if (!thread || typeof thread === "undefined") {
    const error = new Error("THREAD_NOT_FOUND");
    error.status = 404;
    throw error;
  }

  if (thread.user_id !== foundUser.id) {
    const error = new Error("FORBIDDEN_USER");
    error.status = 403;
    throw error;
  }

  await threadDao.modifyThreads(threadId, content);
  // 에러가 발생하지 않았다면 클라이언트에게 성공 응답
  return { success: true, message: "UPDATE_SUCCESS" };
};

const threadDelete = async (threadId, userId) => {
  //  Error handling - 존재하지 않는 쓰레드를 삭제하는 경우
  const existingThread = await threadDao.findThreadById(threadId);
  console.log(existingThread);
  if (existingThread.length == 0) {
    const err = new Error("CONTENT_NOT_FOUND");
    err.status = 400;

    throw err;
  }

  //  Error handling - 다른 유저가 쓴 쓰레드를 삭제하는 경우
  const thisUserThread = await threadDao.findThreadUser(userId);
  console.log(thisUserThread);
  if (existingThread.length > 0 && thisUserThread.length == 0) {
    const err = new Error("NO_ACCESS");
    err.status = 400;

    throw err;
  }

  await threadDao.deleteThread(threadId, userId);
};

module.exports = { threadWrite, threadsList, modifyThreads, threadDelete };
