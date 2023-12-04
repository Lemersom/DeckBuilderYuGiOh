const amqp = require('amqplib')
const errorDAO = require('../DAO/error-dao')

const QUEUE_NAME = 'errors'

module.exports = {
    errorMessage: {},

    sendMessage: async function(error) {
        let connection;
        try {
            connection = await amqp.connect('amqp://localhost')
            const channel = await connection.createChannel()

            await channel.assertQueue(QUEUE_NAME, { durable: false })
            channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(error)))

            this.errorMessage = error

            setTimeout(async () => {
                await connection.close()
            }, 1000)
        }
        catch (err) {
            console.log("Error sending message: " + err)
        }
        finally {
            if(connection) {
                await connection.close
            }
        }
    },

    receiveMessage: async function() {
        try {
            const connection = await amqp.connect('amqp://localhost')
            const channel = await connection.createChannel()

            await channel.assertQueue(QUEUE_NAME, { durable: false })
            channel.consume(QUEUE_NAME, async (msg) => {
                if(msg) {
                    await errorDAO.newError(this.errorMessage.status, this.errorMessage.message)
                    channel.ack(msg)
                }
            })
        }
        catch(err) {
            console.log("Error receiving message: " + err)
        }
    }
}