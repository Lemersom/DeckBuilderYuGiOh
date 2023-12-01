const express = require('express');
const cors = require('cors');
const cache = require('express-redis-cache');
const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');
const path = require('path');   
require('dotenv').config();

const app = express();

const WebsocketServer = new WebSocket.Server({
    port: 8080
})

const redisCache = cache({
    host: 'localhost',
    port: 6379
});

app.use(express.json(), cors());

app.use('/', require('./controller/login-controller'));
app.use('/api/card', require('./controller/card-controller'));
app.use('/install', require('./controller/install-controller'));


// const privateKey = fs.readFileSync(path.resolve(__dirname, ''), 'utf8');
// const certificate = fs.readFileSync(path.resolve(__dirname, ''), 'utf8');

// const credentials = { key: privateKey, cert: certificate };

// const httpsServer = https.createServer(credentials, app);

/*openssl req -x509 -nodes -newkey rsa:2048 -keyout privkey.pem -out cert.pem -days 365 -------------- COMANDO PARA GERAR O SERTIFICADO E CHAVE*/


/*httpsServer*/app.listen(3000, () => {
    console.log(`Server running on port ${3000}`);
  });

module.exports = {WebsocketServer}