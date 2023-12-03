const express = require('express')
const router = express.Router()
const installService = require('../service/install-service')

router.get('/', async (req, res) => {
    const response = await installService.install()
    res.status(response.status).json(response.data)
})

module.exports = router