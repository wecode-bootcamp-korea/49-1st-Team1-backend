const { threadService } = require("../services");

const writeThread = async (req, res) => {
  const newThread = req.body;
  const newThreadContent = newThread.content;
  const newThreadUser = newThread.user_id;

  await threadService.threadWrite(newThreadUser, newThreadContent);

  return res.status(201).json({
    message: "THREAD_CREATED",
  });
};

const threadsList = async (req, res) => {
  
    const threadsData = await threadService.threadsList();

    return res.status(200).json({
      message: "READ_SUCCESS",
      data: threadsData,
    });
  };

const modifyThreads = async (req, res) => {

    const { threadId } = req.params; 
    const { content } = req.body; 
    const { foundUser } = req;

    const result = await threadService.modifyThreads(foundUser, threadId, content);
    console.log("thread check")
    
    res.status(200).json({ message: result.message });
};

const deleteThread = async (req, res) => {
  const thread = req.body;
  const threadId = thread.id;
  const userId = thread.user_id;

  await threadService.threadDelete(threadId, userId);

  return res.status(200).json({
    message: "THREAD_DELETED"
  });
};

module.exports = {
  writeThread,
  threadsList,
  modifyThreads,
  deleteThread
};