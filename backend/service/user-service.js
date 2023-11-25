const userDAO = require('../DAO/user-dao')

module.exports = {
    getUserById: async function(id) {
        return await userDAO.getById(id)
    },

    getUserByEmail: async function(email) {
        return await userDAO.getByEmail(email)
    },

    listUsers: async function(limit, page) {
        const users = await userDAO.list(limit, page)
        if(users) {
            if(users.rows.length > 0) {
                return { status: 200, data: users }
            }
            return { status: 204, data: "Not enough Users data for this page with this limit" }
        }
        return { status: 500, data: "Unable to perform the search for Users" }
    },

    createUser: async function(email, password) {
        if(await this.getUserByEmail(email) == null){
            const newUser = await userDAO.create(email, password)
            return { status: 201, data: newUser }
        }
        return { status: 409, data: "This email already has an account" }
    }
}