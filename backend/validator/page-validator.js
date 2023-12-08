const Joi = require('joi')
const messagePublisher = require('../messaging/publisher')

const minLimit = 4,
      maxLimit = 20;

module.exports = {
    
    validateLimit: async function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.query.limit)
        if(error) {
            const errorLog = { status: 400, message: "Limit cannot be null" }
            await messagePublisher.sendMessageToError(errorLog)

            return res.status(errorLog.status).json(errorLog.message)
        }

        if(req.query.limit != minLimit && req.query.limit != maxLimit) {
            const errorLog = { status: 400, message: `Limit must be ${minLimit} or ${maxLimit}` }
            await messagePublisher.sendMessageToError(errorLog)

            return res.status(errorLog.status).json(errorLog.message)
        }

        req.query.limit = value
        return next()
    },

    validatePage: async function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.query.page)

        if(error) {
            const errorLog = { status: 400, message: "Page cannot be null" }
            await messagePublisher.sendMessageToError(errorLog)

            return res.status(errorLog.status).json(errorLog.message)
        }

        if(req.query.page == 0) {
            const errorLog = { status: 400, message: "Page must be > 0" }
            await messagePublisher.sendMessageToError(errorLog)

            return res.status(errorLog.status).json(errorLog.message)
        }

        req.query.page = value
        return next()
    }
}