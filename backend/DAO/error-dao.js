const ErrorModel = require('../model/Error')

module.exports = {
    list: async function() {
        return await ErrorModel.findAndCountAll()
    },

    newError: async function(status, message) {
        const newLog = await ErrorModel.create({
            status: status,
            message: message
        })

        return newLog
    },

    getById: async function(id) {
        return await ErrorModel.findByPk(id)
    }
}