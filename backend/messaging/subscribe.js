const amqp = require('amqplib')

const QUEUE_NAME = 'logs'

const receiveMessage = async () => {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()

    channel.consume(QUEUE_NAME, (msg) => {
        console.log(msg.content.toString())
        channel.ack(msg)
    })
}
module.exports = receiveMessage