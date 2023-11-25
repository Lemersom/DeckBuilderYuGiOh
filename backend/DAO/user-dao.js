const UserModel = require("../model/User")

module.exports = {
    list: async function(limit, page) {
        return await UserModel.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit
        })
    },

    create: async function(email, password) {
        const newUser = await UserModel.create({
            email: email,
            password: password
        })

        return newUser
    },

    getById: async function(id) {
        return await UserModel.findByPk(id)
    },

    getByEmail: async function(email) {
        return await UserModel.findOne({
            where: { email: email }
        })
    }
}