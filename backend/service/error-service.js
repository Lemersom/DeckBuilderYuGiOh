const ErrorDAO = require('../DAO/error-dao')

module.exports = {
    getCardById: async function(id) {
        return await ErrorDAO.getById(id)
    },

    listError: async function() {
        const errors = await ErrorDAO.list()
        if(errors) {
            if(errors.rows.length > 0) {
                return { status: 200, data: errors }
            }
            return { status: 204, data: "Not enough Errors data for this page with this limit" }
        }
        return { status: 500, data: "Unable to perform the search for Errors" }
    },

    newError: async function(status, message) {
        const newError = await ErrorDAO.create(status, message)
        
        return { status: 201, data: newError }
    }
}