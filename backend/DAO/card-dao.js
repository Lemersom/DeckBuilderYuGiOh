const CardModel = require("../model/Card")

module.exports = {
    list: async function(limit, page) {
        return await CardModel.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit
        })
    },

    create: async function(name, image) {
        const newCard = await CardModel.create({
            name: name,
            image: image
        })

        return newCard
    },

    getById: async function(id) {
        return await CardModel.findByPk(id)
    },

    getByName: async function(name) {
        return await CardModel.findOne({
            where: { name: name }
        })
    }
}