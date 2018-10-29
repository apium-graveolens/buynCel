const db = require('../db')

const checkAdmin = async (id) => {
    let adminCheck = await db.User.findById(id)
    return adminCheck.isAdmin
}

module.exports = checkAdmin