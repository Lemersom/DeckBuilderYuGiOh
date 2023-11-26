const express = require('express')
const cors = require('cors')
const cache = require('express-redis-cache')
require('dotenv').config()
const app = express()

const redisCache = cache({
    host: 'localhost',
    port: 6379
})

app.use(express.json(), cors())

app.use('/', require('./controller/login-controller'))
app.use('/api/card', require('./controller/card-controller'))
app.use('/install', require('./controller/install-controller'))

app.listen(3000, () => {
    console.log("Server running on port 3000")
})