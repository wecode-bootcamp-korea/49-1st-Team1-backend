//require
const userService = require ("../services");

const writeThread = async (req, res) => {

        //쓰레드 가져오기
        const newThread = req.body
        const newThreadContent = newThread.content
        const newThreadUser = newThread.user_id

        //쓰레드 db에 등록
        await userService.threadWrite(newThreadUser, newThreadContent)

        return res.status(201).json({
            message: "THREAD_CREATED"
        })
    };

const deleteThread = async (req, res) => {

        //  삭제할 쓰레드
        const thread = req.body
        const threadId = thread.id
        const userId = thread.user_id

        // 쓰레드 삭제
        await userService.threadDelete(threadId, userId)

        //response
        return res.status(200).json ({
            message: "THREAD_DELETED"
        })

    }

//모듈 export하기
module.exports = { 
    writeThread, deleteThread
}
    
    