const { myDataSource } = require("./dataSource");

const insertThread = async (newThreadUser, newThreadContent) => {
  await myDataSource.query(
    `INSERT INTO threads (user_id, content) VALUES ("${newThreadUser}", "${newThreadContent}")`
  );
};

const threadsList = async () => {
  const result = await myDataSource.query(
    `
      SELECT 
       threads.id as postId,
       users.nickname,
       users.profile_image as profileImage,
       threads.content,
       threads.created_at as createdAt
      FROM threads
      JOIN users ON threads.user_id = users.id
      ORDER BY createdAt DESC
      `
  );
  return result;
};

const findThreadById = async (threadId) => {
  const thread = await myDataSource.query(
    `SELECT * FROM threads WHERE id = "${threadId}"`
  );
  return thread;
};

const findThreadUser = async (userId) => {
  const user = await myDataSource.query(
    `SELECT * FROM threads WHERE user_id = "${userId}"`
  );
  return user;
};

const modifyThreads = async (threadId, content) => {
  console.log("thread check")
  await myDataSource.query(
    `
      UPDATE threads
      SET content = ?
      WHERE id = ?
      `,
    [content, threadId]
  );
};

const deleteThread = async (threadId, userId) => {
  await myDataSource.query(
    `DELETE FROM threads WHERE id = ? AND user_id = ?`, [threadId, userId]
  );
};

module.exports = {
  insertThread,
  threadsList,
  findThreadById,
  findThreadUser,
  modifyThreads,
  deleteThread
};