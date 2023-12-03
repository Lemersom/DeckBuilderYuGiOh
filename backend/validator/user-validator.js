const Joi = require('joi');

module.exports = {
    validateEmail: function(req, res, next) {
        const { error, value } = Joi.string().required().validate(req.body.email)
        if(error) {
            return res.status(400).json("Email cannot be null")
        }

        req.body.email = value
        return next()
    },
    
    validatePassword: function(req, res, next) {
        const { error, value } = Joi.string().required().validate(req.body.password)
        if(error) {
            return res.status(400).json("Password cannot be null")
        }

        req.body.password = value
        return next()
    },
}