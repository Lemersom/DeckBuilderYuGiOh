const express = require('express');
const cors = require('cors');
const cache = require('express-redis-cache');
const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');  
const {xss} = require('express-xss-sanitizer')
require('dotenv').config()

const WebsocketServer = require('./websocket/websocket-server')

const app = express();

app.use(express.json(), cors(), xss());

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
}, app).listen(3000, () => {
    console.log(`Server running on port ${3000}`);
});

const redisCache = cache({
    host: 'localhost',
    port: 6379
});

app.use('/', require('./controller/login-controller'));
app.use('/api/card', require('./controller/card-controller'));
app.use('/install', require('./controller/install-controller'));