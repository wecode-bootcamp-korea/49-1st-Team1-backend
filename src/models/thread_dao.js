const { myDataSource } = require("./dataSource");

//쓰레드 남기기
const insertThread = async (newThreadUser, newThreadContent) => {
  await myDataSource.query(
    `INSERT INTO threads (user_id, content) VALUES ("${newThreadUser}", "${newThreadContent}")`
  )
};



//  삭제할 쓰레드
const findThread = async (threadId) => {
    const thread = await myDataSource.query(`SELECT * FROM threads WHERE id = "${threadId}"`)
    return thread;
  };


//  삭제할 쓰레드
const findThreadUser = async (userId) => {
  const user = await myDataSource.query(`SELECT * FROM threads WHERE user_id = "${userId}"`)
  return user;
};


const deleteThread = async (threadId, userId) => {
  await myDataSource.query(`DELETE FROM threads WHERE id = "${threadId}" AND user_id = "${userId}"`)
}

//모듈 export하기
module.exports = {
insertThread,
  findThread,
  findThreadUser,
  deleteThread
};
