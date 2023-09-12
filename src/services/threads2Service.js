const threadsDao = require('../models/threads2Dao')

const threadsList = async () => {

    try {
        const threadsListData = await threadsDao.threadsList()
        return threadsListData;
    } catch (err) {
        console.log(err)
    }

}


module.exports = { threadsList }