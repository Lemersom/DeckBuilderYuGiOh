const CardModel = require("../model/Card")
const { Op } = require('sequelize')

module.exports = {
    list: async function(limit, page, name) {
        if(name) {
            return await CardModel.findAndCountAll({
                where: {
                    name: { [Op.like]: '%' + name + '%' }  
                },
                limit: limit,
                offset: (page - 1) * limit
            })
        }
        else{
            return await CardModel.findAndCountAll({
                limit: limit,
                offset: (page - 1) * limit
            })
        }
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