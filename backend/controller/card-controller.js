const express = require('express')
const router = express.Router()
const cardService = require('../service/card-service')
const authValidator = require('../validator/auth-validator')
const pageValidator = require('../validator/page-validator')
const cardValidator = require('../validator/card-validator')
const cache = require('express-redis-cache')()


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
    cache.route({ expire: 3600 }),
    async (req, res) => {
        const response = await cardService.listCards(req.query.limit, req.query.page)
        res.status(response.status).json(response.data)
})

router.get('/:id', 
    authValidator.validateToken,
    async (req, res) => {
        const response = await cardService.getCardById(req.params.id)
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