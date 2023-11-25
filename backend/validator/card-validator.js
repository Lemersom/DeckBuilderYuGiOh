const Joi = require('joi')

module.exports = {
    validateName: function(req, res, next) {
        const { error, value } = Joi.string().required().validate(req.body.name)
        if(error) {
            return res.status(400).json("Card name cannot be null")
        }

        req.body.name = value
        return next()
    },

    validateImage: function(req, res, next) {
        const { error, value } = Joi.string().regex(
            /^(https:\/\/images\.ygoprodeck\.com\/images\/(cards|cards_small|cards_cropped)\/\d+\.(jpg|jpeg|png))$/
        ).allow('').validate(req.body.image)

        if(error) {
            return res.status(400).json("Card image url must be in the api: https://ygoprodeck.com/api-guide/")
        }

        req.body.image = value
        return next()
    }
}