const { likeDao, threadDao } = require("../models");

const pushLike = async (userId, postId) => {
  const thread = await threadDao.findThread(postId);
  if (!thread) {
    const error = new Error("CONTENT_NOT_FOUND");
    error.status = 404;
    throw error;
  }

  const like = await likeDao.findByIds(userId, postId);
  if (like) {
    await likeDao.deleteByIds(userId, postId);
  } else {
    await likeDao.save(userId, postId);
  }
};

module.exports = { pushLike };
