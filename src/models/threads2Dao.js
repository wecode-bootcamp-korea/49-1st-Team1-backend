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

const findThreadById = async (id) => {

    try {
        const result = await myDataSource.query(
            `
            SELECT * FROM threads WHERE id = ?
            `, [id]
        )

        return result;

    } catch (err) {
        console.log(err)
    }

}

const modifyThreads = async (id, content) => {

    try {

        await myDataSource.query(
            `
            UPDATE threads
            SET content = ?
            WHERE id = ?
            `,
            [content, id]
        )

    } catch (err) {
        console.log(err)
    }
}

module.exports = { threadsList, findThreadById, modifyThreads }