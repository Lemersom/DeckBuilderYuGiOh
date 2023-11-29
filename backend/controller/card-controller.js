const express = require('express')
const router = express.Router()
const logDAO = require('../DAO/log-dao')
const cardService = require('../service/card-service')
const userService = require('../service/user-service')
const authValidator = require('../validator/auth-validator')
const pageValidator = require('../validator/page-validator')
const cardValidator = require('../validator/card-validator')
const cache = require('express-redis-cache')()
const sendMessage = require('../messaging/publish')
const receiveMessage = require('../messaging/subscribe')

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
})

router.get('/:name', 
    authValidator.validateToken,
    pageValidator.validateLimit,
    pageValidator.validatePage,
    cache.route({ expire: 15 }),
    async (req, res) => {
        const response = await cardService.listCards(req.query.limit, req.query.page, req.params.name)

        const userResponse = await userService.getUserById(req.userId)

        const log = { search: req.params.name, userEmail: userResponse.email, date: new Date().toLocaleString() }

        // await sendMessage(log)
        // await receiveMessage()

        //const log = await logDAO.create(req.params.name, userResponse.email, new Date().toLocaleString())

        res.status(200).json(response)
})

router.post('/', 
    authValidator.validateToken,
    cardValidator.validateName,
    cardValidator.validateImage,
    cache.invalidate(),    
    async (req, res) => {
        const response = await cardService.createCard(
            req.body.name,
            req.body.image
        )
        res.status(response.status).json(response.data)
})

module.exports = router