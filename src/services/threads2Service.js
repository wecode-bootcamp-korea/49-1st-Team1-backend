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

        const thread = await threads2Dao.findThreadById(id);

        //TypeError: Cannot read property 'user_id' of undefined도 처리하기 위해 || typeof thread[0] === 'undefined' 추가
        if (!thread || typeof thread[0] === 'undefined') {
            const error = new Error("THREAD_NOT_FOUND");
            error.status = 404;
            throw error;
        }

        console.log("thread[0].user_id : ", thread[0].user_id)
        console.log("foundUser.id : ", foundUser.id)

        if (thread[0].user_id !== foundUser.id) {
            const error = new Error("FORBIDDEN_USER");
            error.status = 403; // Forbidden 클라이언트가 요청한 리소스에 접근 권한 X
            throw error;
        }

        await threads2Dao.modifyThreads(id, content)
        // 에러가 발생하지 않았다면 클라이언트에게 성공 응답
        return { success: true, message: "update success"}

    } catch (err) {
        // 에러가 발생했을 때, 해당 에러를 호출자에게 다시 던집니다.
        throw err;
    }
}

module.exports = { threadsList, modifyThreads }