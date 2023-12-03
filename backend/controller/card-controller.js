const express = require('express')
const router = express.Router()
const cardService = require('../service/card-service')
const userService = require('../service/user-service')
const authValidator = require('../validator/auth-validator')
const pageValidator = require('../validator/page-validator')
const cardValidator = require('../validator/card-validator')
const cache = require('express-redis-cache')()
const logMessage = require('../messaging/log-messaging')
const {sanitize} = require('express-xss-sanitizer');

cache.invalidate = (name) => {
    return (req, res, next) => {
        const route_name = name ? name : `/api/card?*`
        if(!cache.connected) {
            next()
            return
        }
        cache.del(route_name, (err) => {
            if (err) {
                console.log(`Error deleting cache: ${err}`)
            }
            else{
                console.log(`Cache deleted: ${route_name}`)
            }
        })
        next()
    }
}


router.get('/', 
    authValidator.validateToken,
    pageValidator.validateLimit,
    pageValidator.validatePage,
    cache.route({ expire: 15 }),
    async (req, res) => {
        const response = await cardService.listCards(req.query.limit, req.query.page)
        res.status(response.status).json(response.data)
    }
)

router.get('/:name', 
    authValidator.validateToken,
    pageValidator.validateLimit,
    pageValidator.validatePage,
    cache.route({ expire: 15 }),
    async (req, res) => {
        req.params.name = sanitize(req.params.name)
        const response = await cardService.listCards(req.query.limit, req.query.page, req.params.name)

        const userResponse = await userService.getUserById(req.userId)

        const log = { search: req.params.name, userEmail: userResponse.email, date: new Date().toLocaleString() }

        await logMessage.sendMessage(log)
        await logMessage.receiveMessage()

        res.status(response.status).json(response.data)
    }
)

router.post('/', 
    authValidator.validateToken,
    cardValidator.validateName,
    cardValidator.validateImage,
    cache.invalidate(),    
    async (req, res) => {
        req.body.name = sanitize(req.body.name)
        req.body.image = sanitize(req.body.image)
        const response = await cardService.createCard(
            req.body.name,
            req.body.image
        )
        
        res.status(response.status).json(response.data)
    }
)

module.exports = router