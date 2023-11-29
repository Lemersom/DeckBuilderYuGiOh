const cardDAO = require('../DAO/card-dao')

module.exports = {
    getCardById: async function(id) {
        return await cardDAO.getById(id)
    },

    getCardByName: async function(name) {
        return await cardDAO.getByName(name)
    },

    listCards: async function(limit, page, name) {
        const cards = await cardDAO.list(limit, page, name)
        if(cards) {
            if(cards.rows.length > 0) {
                return { status: 200, data: cards }
            }
            return { status: 204, data: "Not enough Cards data for this page with this limit" }
        }
        return { status: 500, data: "Unable to perform the search for Cards" }
    },

    createCard: async function(name, image) {
        const newcard = await cardDAO.create(name, image)
        
        return { status: 201, data: newcard }
    }
}