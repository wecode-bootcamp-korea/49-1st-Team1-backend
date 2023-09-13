const { myDataSource } = require("./dataSource");

const threadsList = async () => {

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
    }

const findThreadById = async (id) => {

        const result = await myDataSource.query(
            `
            SELECT * FROM threads WHERE id = ?
            `, [id]
        )

        return result
}

const modifyThreads = async (id, content) => {

        await myDataSource.query(
            `
            UPDATE threads
            SET content = ?
            WHERE id = ?
            `,
            [content, id]
        )
}

module.exports = { 
    threadsList, 
    findThreadById,
    modifyThreads 
}