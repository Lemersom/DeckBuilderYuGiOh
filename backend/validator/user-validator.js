const Joi = require('joi');
const errorMessage = require('../messaging/error-messaging')

module.exports = {
    validateEmail: async function(req, res, next) {
        const { error, value } = Joi.string().required().validate(req.body.email)
        if(error) {
            const errorLog = { status: 400, message: "Email cannot be null" }
            await errorMessage.sendMessage(errorLog)
            await errorMessage.receiveMessage() 

            return res.status(errorLog.status).json(errorLog.message)
        }

        req.body.email = value
        return next()
    },
    
    validatePassword: async function(req, res, next) {
        const { error, value } = Joi.string().required().validate(req.body.password)
        if(error) {
            const errorLog = { status: 400, message: "Password cannot be null" }
            await errorMessage.sendMessage(errorLog)
            await errorMessage.receiveMessage() 

            return res.status(errorLog.status).json(errorLog.message)
        }

        req.body.password = value
        return next()
    },
}