const sequelize = require('../helper/database')
const userDao = require('../DAO/user-dao')

async function createFirstUsers() {
    const user1 = await userDao.create("user1@user.com", "user1")
    const user2 = await userDao.create("user2@user.com", "user2")

    return {user1: user1, user2: user2}
}

module.exports = {
    install: async function() {
        await sequelize.sync({force: true})

        const firstUsers = await createFirstUsers()

        return {status: 200, data: firstUsers}
    }
}