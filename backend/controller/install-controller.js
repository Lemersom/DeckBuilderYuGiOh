const express = require('express')
const router = express.Router()
const installService = require('../service/install-service')
const messagePublisher = require('../messaging/publisher')

router.get('/', async (req, res) => {
    const response = await installService.install()

    if(response.status > 399 && response.status < 600){
      const error = { status: response.status, message: response.data }
      await messagePublisher.sendMessageToError(error)
    }

    res.status(response.status).json(response.data)
})

module.exports = router