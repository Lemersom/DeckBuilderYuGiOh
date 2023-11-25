const express = require('express')
const router = express.Router()
const auth = require('../helper/auth')

router.post('/login', async (req, res) => {
    const response = await auth.authLogin(req.body.email, req.body.password)
    res.status(response.status).json(response.data)
})

module.exports = router