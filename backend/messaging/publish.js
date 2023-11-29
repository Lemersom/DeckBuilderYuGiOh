const amqp = require('amqplib')

const QUEUE_NAME = 'logs'

const sendMessage = async (log) => {
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()

    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(log)))

    setTimeout(() => {
        connection.close()
    }, 1000)
}
module.exports = sendMessage