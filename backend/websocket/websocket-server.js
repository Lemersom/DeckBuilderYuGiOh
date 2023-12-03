const WebSocket = require('ws')

const WebsocketServer = new WebSocket.Server({
    port: 8080
})

let connections = []

WebsocketServer.on('connection', (socket) => {
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
})

module.exports = WebsocketServer