//require
const userService = require ("./dana_services");


const writeThread = (req, res) => {

        //쓰레드 가져오기
        const newThread = req.body
        const newThreadContent = newThread.content
        const newThreadUser = newThread.user_id


        //쓰레드 db에 등록
        userService.threadToWrite(newThreadContent, newThreadUser)

        return res.status(200).json({
            message: "THREAD_CREATED"
        })
    };

const userDeleteThread = (req, res) => {

        //  삭제할 쓰레드
        const thread = req.body
        const threadId = thread.id
        const userId = thread.user_id


        // 쓰레드 삭제
        userService.threadToDelete(threadId, userId)

        //response
        return res.status(200).json ({
            message: "THREAD_DELETED"
        })

    }

//모듈 export하기
module.exports = {
    "thread_write": writeThread,
    "thread_delete": userDeleteThread
}
    
    