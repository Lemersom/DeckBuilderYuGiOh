const Joi = require('joi')
const errorMessage = require('../messaging/error-messaging')

module.exports = {
    validateName: async function(req, res, next) {
        const { error, value } = Joi.string().required().validate(req.body.name)
        if(error) {
            const errorLog = { status: 400, message: "Card name cannot be null" }
            await errorMessage.sendMessage(errorLog)
            await errorMessage.receiveMessage() 

            return res.status(errorLog.status).json(errorLog.message)
        }

        req.body.name = value
        return next()
    },

    validateImage: async function(req, res, next) {
        const { error, value } = Joi.string().regex(
            /^(https:\/\/images\.ygoprodeck\.com\/images\/(cards|cards_small|cards_cropped)\/\d+\.(jpg|jpeg|png))$/
        ).allow('').validate(req.body.image)

        if(error) {
            const errorLog = { status: 400, message: "Card image url must be in the api: https://ygoprodeck.com/api-guide/" }
            await errorMessage.sendMessage(errorLog)
            await errorMessage.receiveMessage() 

            return res.status(errorLog.status).json(errorLog.message)
        }

        req.body.image = value
        return next()
    }
}