const threads2Dao = require('../models')

const threadsList = async () => {

        const threadsListData = await threads2Dao.threadsList()
        
        return threadsListData;

}

const modifyThreads = async (foundUser, id, content) => {

        const thread = await threads2Dao.findThreadById(id);

        //TypeError: Cannot read property 'user_id' of undefined도 처리하기 위해 || typeof thread[0] === 'undefined' 추가
        if (!thread || typeof thread[0] === 'undefined') {
            const error = new Error("THREAD_NOT_FOUND");
            error.status = 404;
            throw error;
        }
        
        // 작성자 = 로그인한 사용자인지
        if (thread[0].user_id !== foundUser.id) {
            const error = new Error("FORBIDDEN_USER");
            error.status = 403; // 403 : Forbidden 클라이언트가 요청한 리소스에 접근 권한 X
            throw error;
        }

        await threads2Dao.modifyThreads(id, content)
        // 에러가 발생하지 않았다면 클라이언트에게 성공 응답
        return { success: true, message: "update success" }
}

module.exports = { 
    threadsList, 
    modifyThreads 
}