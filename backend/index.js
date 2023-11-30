const express = require('express');
const cors = require('cors');
const cache = require('express-redis-cache');
const http = require('http');
const createWebSocketServer = require('./websockets/websocketsLogs');
require('dotenv').config();

const app = express();
// const server = http.createServer(app);

const PORT = 3000;

const redisCache = cache({
    host: 'localhost',
    port: 6379
});

app.use(express.json(), cors());

app.use('/', require('./controller/login-controller'));
app.use('/api/card', require('./controller/card-controller'));
app.use('/install', require('./controller/install-controller'));

// const { wss } = createWebSocketServer();
// server.on('upgrade', (request, socket, head) => {
//     wss.handleUpgrade(request, socket, head, (ws) => {
//         wss.emit('connection', ws, request);
//     });
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

