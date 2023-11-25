const Joi = require('joi')

const minLimit = 4,
      maxLimit = 20;

module.exports = {
    
    validateLimit: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.query.limit)
        if(error) {
            return res.status(400).json("Limit cannot be null")
        }

        if(req.query.limit != minLimit && req.query.limit != maxLimit) {
            return res.status(400).json(`Limit must be ${minLimit} or ${maxLimit}`)
        }

        req.query.limit = value
        return next()
    },

    validatePage: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.query.page)
        if(error) {
            return res.status(400).json("Page cannot be null")
        }

        req.query.page = value
        return next()
    }
}