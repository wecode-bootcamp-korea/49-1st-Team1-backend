const { DataSource } = require("typeorm")


const myDataSource = new DataSource ({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

myDataSource.initialize().then(()=>{
    console.log("Data initialized")
})

const writeThread = (req, res) => {

    try {

        //쓰레드 가져오기
        const newThread = req.body
        const newThreadContent = newThread.content
        const newThreadUser = newThread.user_id


        //error handling - content가 1글자 이상이어야 한다
        if (newThreadContent.length < 2) {
            const error = new Error("CONTENT_TOO_SHORT")
            error.status = 400

            throw error
        }


        //쓰레드 db에 등록

        const threadToDb = myDataSource.query(`INSERT INTO threads (content, user_id) VALUES ("${newThreadContent}", "${newThreadUser}")`)


        return res.status(200).json({
            message: "THREAD_CREATED"
        })
    
    
    } catch (error) {
        return res.status(error.status).json ({
            "message": error.message
        })
    
    }
}

const userDeleteThread = (req, res) => {

    try {

        //  삭제할 쓰레드
        const thread = req.body
        const threadId = thread.id
        const userId = thread.user_id


        //  Error handling - 본인이 아닌 쓰레드를 삭제하는 경우
        const findThread = myDataSource.query(`SELECT * FROM threads WHERE id = "${threadId}"`)
        if (findThread.length === 0) {
            const error = new Error ("CONTENT_NOT_FOUND")
            error.status = 400

            throw error
        }

        //  Error handling - 본인이 아닌 쓰레드를 삭제하는 경우
        const thisUserThread = myDataSource.query(`SELECT * FROM threads WHERE user_id = "${userId}"`)
        if (!thisUserThread.includes(content)) {
            const error = new Error ("NOT_YOUR_THREAD")
            error.status = 400

            throw error
        }


        // 쓰레드 삭제
        const deleteThread = myDataSource.query(`DELETE * FROM threads WHERE id = "${threadId}"`)

        //response
        return res.status(200).json ({
            message: "THREAD_DELETED"
        })

    } catch (error) {
        return res.status(error.status).json({
            "message": error.message
        })

    }
}

//모듈 export하기
module.exports = {
    "thread_write": writeThread,
    "thread_delete": userDeleteThread
}
    
    