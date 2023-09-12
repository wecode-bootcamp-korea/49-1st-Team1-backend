const { myDataSource } = require("./dataSource");

const threadsList = async () => {
    try {

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
        )
        return result;
    } catch (err) {
        console.log(err)
    }

}

const modifyThreads = async

module.exports = { threadsList }