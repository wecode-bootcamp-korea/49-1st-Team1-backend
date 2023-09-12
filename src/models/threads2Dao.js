const { myDataSource } = require("./dataSource");

const threadsList = async () => {
    try {

        const result = await myDataSource.query(
            `
                SELECT * FROM threads ORDER BY created_at DESC
            `
        )
        return result;
    } catch(err) {
        console.log(err)
    }
 
}

module.exports = {threadsList}