const threads2Dao = require('../models/threads2Dao')

const threadsList = async () => {

    try {
        const threadsListData = await threads2Dao.threadsList()
        return threadsListData;
    } catch (err) {
        console.log(err)
    }

}

const modifyThreads = async (foundUser, id, content) => {
    try {
        //서비스에서 스레드 확인하고, 로그인id 작성자 비교 한 다음에 업데이트 
       
        const thread = await threads2Dao.findThreadById(id);
        
        console.log("thread : ", thread)
        
        if (!thread) {
        const error = new Error("CONTENT_NOT_FOUND");
        error.status = 404;
        throw error;
      }

      console.log("thread.user_id : ", thread[0].user_id)
      console.log("foundUser.id : ", foundUser.id)
      
      //thread가 배열로 오기 때문에
       if (thread[0].user_id !== foundUser.id) {
       const error = new Error("NOT_AUTH");
       error.status = 403;
       throw error;
       }

        await threads2Dao.modifyThreads(id, content)

    } catch (err) {
        console.log(err)
    }
}

module.exports = { threadsList, modifyThreads}