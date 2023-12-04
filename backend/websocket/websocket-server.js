const WebSocket = require('ws')
const jwt = require('jsonwebtoken')

const WebsocketServer = new WebSocket.Server({
    port: 8080
})

let connections = []

WebsocketServer.on('connection', async(socket, req) => {

    let token = req.url.split('?token=')[1]
    if(!token) {
        socket.on('close', () => {
            console.log(`Closing WebSocket Connection: ${connections.indexOf(socket)}`)
            connections = connections.filter((s) => s !== socket)
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
        if (error) {
            socket.on('close', () => {
                console.log(`Closing WebSocket Connection: ${connections.indexOf(socket)}`)
                connections = connections.filter((s) => s !== socket)
            })
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