const LogModel = require('../model/Log')

module.exports = {
    list: async function(limit, page) {
        return await LogModel.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit
        })
    },

    create: async function(search, userEmail, date) {
        const newLog = await LogModel.create({
            search: search,
            userEmail: userEmail,
            date: date
        })

        return newLog
    },

    getById: async function(id) {
        return await LogModel.findByPk(id)
    }
}