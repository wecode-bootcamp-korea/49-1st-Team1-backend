const myDataSource = require("./dana_dataSource");

//쓰레드 남기기
const insertThread = (newThreadContent, newThreadUser) => {
  myDataSource.query(
    `INSERT INTO threads (content, user_id) VALUES ("${newThreadContent}", "${newThreadUser}")`
  )
};

//  삭제할 쓰레드
const findThread = (threadId) => {
  myDataSource.query(`SELECT * FROM threads WHERE id = "${threadId}"`)
};

//  삭제할 쓰레드
const findUser = (userId) => {
    myDataSource.query(`SELECT * FROM threads WHERE user_id = "${userId}"`)
  };

//모듈 export하기
module.exports = {
insertThread,
  findThread,
  findUser
};
