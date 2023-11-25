const express = require('express')
const router = express.Router()
const cardService = require('../service/card-service')
const authValidator = require('../validator/auth-validator')
const pageValidator = require('../validator/page-validator')
const cardValidator = require('../validator/card-validator')

router.get('/', 
    authValidator.validateToken,
    pageValidator.validateLimit,
    pageValidator.validatePage,
    async (req, res) => {
        const response = await cardService.listCards(req.query.limit, req.query.page)
        res.status(response.status).json(response.data)
})

router.post('/', 
    authValidator.validateToken,
    cardValidator.validateName,
    cardValidator.validateImage,
    async (req, res) => {
        const response = await cardService.createCard(
            req.body.name,
            req.body.image
        )
        res.status(response.status).json(response.data)
})

module.exports = router