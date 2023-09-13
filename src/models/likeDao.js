const { myDataSource } = require("./dataSource");

const save = async (userId, postId) => {
  await myDataSource.query(
    `
    INSERT INTO thread_likes (
      user_id,
      thread_id
    )
    VALUES (?, ?)
    `,
    [userId, postId]
  );
};

const findByIds = async (userId, postId) => {
  const [likes] = await myDataSource.query(
    `
    SELECT *
    FROM thread_likes
    WHERE 
      user_id = ?
    AND
      thread_id = ?
    `,
    [userId, postId]
  );

  return likes;
};

const deleteByIds = async (userId, postId) => {
  await myDataSource.query(
    `
    DELETE FROM thread_likes 
    WHERE 
      user_id = ?
    AND
      thread_id = ?
    `,
    [userId, postId]
  );
};

const count = async (postId) => {
  const [result] = await myDataSource.query(
    `
    SELECT COUNT(*) FROM thread_likes
    WHERE
      thread_id = ?
    `,
    [postId]
  );

  return result["COUNT(*)"];
};

module.exports = { save, findByIds, deleteByIds, count };
