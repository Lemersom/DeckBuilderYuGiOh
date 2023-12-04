const express = require('express')
const router = express.Router()
const cardService = require('../service/card-service')
const userService = require('../service/user-service')
const authValidator = require('../validator/auth-validator')
const pageValidator = require('../validator/page-validator')
const cardValidator = require('../validator/card-validator')
const cache = require('express-redis-cache')()
const logMessage = require('../messaging/log-messaging')
const errorMessage = require('../messaging/error-messaging')

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

        if(response.status > 200 && response.status < 600){

            const error = { status: response.status, message: response.data.message }
  
            await errorMessage.sendMessage(error)
            await errorMessage.receiveMessage()  
  
          }
        
        res.status(response.status).json(response.data)
    }
)

router.get('/:name', 
    authValidator.validateToken,
    pageValidator.validateLimit,
    pageValidator.validatePage,
    cache.route({ expire: 15 }),
    async (req, res) => {
        const response = await cardService.listCards(req.query.limit, req.query.page, req.params.name)

        if(response.status > 399 && response.status < 600){

            const error = { status: response.status, message: response.data }
  
            await errorMessage.sendMessage(error)
            await errorMessage.receiveMessage()  
  
          }

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
        const response = await cardService.createCard(
            req.body.name,
            req.body.image
        )

        if(response.status > 399 && response.status < 600){
            

            const error = { status: response.status, message: response.data }
  
            await errorMessage.sendMessage(error)
            await errorMessage.receiveMessage()  
  
          }
        
        res.status(response.status).json(response.data)
    }
)

module.exports = router