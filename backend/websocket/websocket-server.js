const WebSocket = require('ws')
const jwt = require('jsonwebtoken')

const WebsocketServer = new WebSocket.Server({
    port: 8080
})

let connections = []

WebsocketServer.on('connection', (socket, req) => {

    let token = req.url.split('?token=')[1]
    if(!token) {
        res.status(403).json("Acess denied - Token missing")
        return
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            res.status(403).json("Access denied - Invalid token");
            return;
        }
        

        connections.push(socket)

        socket.on('close', () => {
            console.log(`Closing WebSocket Connection: ${connections.indexOf(socket)}`)
            connections = connections.filter((s) => s !== socket)
        })

        socket.on('message', (msg) => {
            console.log(`WebSocket message, ${connections.indexOf(socket)}: ${msg}`)

            connections.forEach((conn) => {
                if(conn != socket){
                    conn.send(`${connections.indexOf(socket)}: ${msg}`)
                }
            })
        })

    });

})

module.exports = WebsocketServer