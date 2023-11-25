const express = require('express')
const cors = require('cors')

const app = express()

require('dotenv').config()

app.use(express.json(), cors())

app.use('/', require('./controller/login-controller'))
app.use('/api/card', require('./controller/card-controller'))
app.use('/install', require('./controller/install-controller'))

app.listen(3000, () => {
    console.log("Server running on port 3000")
})