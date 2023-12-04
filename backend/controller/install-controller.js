const express = require('express')
const router = express.Router()
const installService = require('../service/install-service')
const errorMessage = require('../messaging/error-messaging')

router.get('/', async (req, res) => {
    const response = await installService.install()

    if(response.status > 399 && response.status < 600){

        const error = { status: response.status, message: response.data }

        await errorMessage.sendMessage(error)
        await errorMessage.receiveMessage()  

      }
    res.status(response.status).json(response.data)
})

module.exports = router